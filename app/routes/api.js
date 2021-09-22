const { compare } = require('bcrypt-nodejs');
const { resolveSoa } = require('dns');
var User=require('../models/user');
var Product=require('../models/product');
var Cart=require('../models/cart');
var RunOut=require('../models/runout');
var Payment = require('../models/pay');
var jwt = require('jsonwebtoken');
const { cpuUsage } = require('process');
const e = require('express');
const { estimatedDocumentCount } = require('../models/user');
const cart = require('../models/cart');
var secret = 'whoa';
var email_signed={};
var async = require('async');
const { utimes } = require('fs');
var isLoggedIn=false;

module.exports= function(router){
    router.post('/users',function(req,res){

        var user = new User();

        user.firstname = req.body.firstname;

        user.lastname = req.body.lastname;

        user.password = req.body.password;

        user.email = req.body.email;

        var confirm=req.body.confirm;

        if(req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == ""){
            res.json({success: false, message : 'Ensure username,email or password'});
        }
        else if(req.body.password.length<6 || req.body.password.length>18){
            res.json({success: false, message : 'Password must be between 6-18 characters'});
        }
        else if(req.body.confirm != req.body.password){
            res.json({success: false, message : 'Passwords doesnt match.Please try again'});
        }
        else{
            var cart  = new Cart();

            cart.email = req.body.email;
    
            cart.size = '1';
    
            cart.save();
    
            user.save(function(err){
            
                if(err){
                    res.json({success: false,message: 'Email already exists'});
                }
                else{
                    res.json({success: true,message: 'User created.You can now login.'});
                }
            });
        }
    
    });

    router.post('/authenticate',function(req,res){

        email_signed=req.body.email;


        User.findOne({email: req.body.email}).select('email password').exec(function(err,user){
            if(err) throw err;

            if(!user){
                res.json({success:false,message: 'Could not authenticate user'});
            }
            else if(user){

                if(req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                }
                else{
                    res.json({success: false, message: 'No password provided'});
                }
                if(!validPassword){
                    res.json({success: false, message: 'Could not authenticate password'});
                }
                else{
                    var token = jwt.sign({
                        email: user.email,
                        firstname: user.firstname
                    },secret,{expiresIn: '1h'});


                    res.json({success:true, message: 'User authenticated.We will redirect you to Home page!',token: token });
                }
            }
        });

    });
    router.post('/products',function(req,res){
        Product.findOne({name: req.body.name,size : req.body.size}).exec(function(err,prod){
             
            if(err) throw err;

            if(!prod){

                var product = new Product();

                product.brand = req.body.brand;
        
                product.size = req.body.size;
        
                product.name = req.body.name;
        
                product.quantity = req.body.quantity;

                product.price = req.body.price;

                product.link = req.body.link;

        
                if(req.body.brand == null || req.body.brand == "" || req.body.size == null || req.body.size == "" || req.body.name == null || req.body.name == "" ){
                    res.json({success: false, message : 'Ensure data'});
                }
                else{
                    product.save(function(err){
                        
                        if(err){
                            res.json({success: false,message: 'An error occured'});
                        }
                        else{
                            res.json({success: true,message: 'Product submited'});
                        }
                    });
                }
            }
            else{
                var query = {"name" : req.body.name,"size" : req.body.size};
                var newval = {$set: { "quantity" : +req.body.quantity + +prod.quantity}};

                Product.updateOne(query,newval,function(){
                    res.json({success: true,message: 'Updated quantity'});
                });    
            }
        });
   
    });
    router.post('/cart',function(req,res){  
        
        if(isLoggedIn==false){
            res.json({success:false,message:'You have to Register/Login to add a product to the cart'});
        }
        else{

            var cart = new Cart();

            cart.email = email_signed;

            Product.findOne({name : req.body.productname}).exec(function(err,prod){

                var query={email : email_signed};
                var find = {products :{$elemMatch :{brand : prod.brand,size: req.body.size ,name: prod.name ,price : prod.price, link: prod.link}}};


                Cart.findOne(query,find).exec(function(err,found){

                    if(err){
                        console.log('do non');
                    }
                    else{
                        if(found.products.length != 0){
                            var quan_new  = found.products[0].quantity + 1;

                            var query_2={email : email_signed};

                            var array_2 = {$pull : {products: {brand : prod.brand,size: req.body.size ,name: prod.name ,price : prod.price, link: prod.link}}};

                            Cart.updateMany(query_2,array_2,function(){
                                var query_2={email : email_signed};
                                var array_3 = {$push : {products: {brand : prod.brand,size: req.body.size ,name: prod.name ,quantity : quan_new,price : prod.price, link: prod.link}}};
                            
                                Cart.updateMany(query_2,array_3,function(){
                      
                                    res.json({success:true,message:'Added to cart'});
                                });
                            });
                        }
                        else{
                            
                            var query_3={email : email_signed};

                            var array_5 = {$push : {products: {brand : prod.brand,size: req.body.size ,name: prod.name ,quantity: 1,price : prod.price, link: prod.link}}};

                            Cart.updateOne(query_3,array_5,function(){
                                res.json({success:true,message:'Added to cart'});
                            });
                        }
                    }
                });
            });
        }
    });

    router.get('/orders',function(req,res){

        console.log('api');

        Payment.find({})
        .exec(function(err,orders){

            if(err){
                console.log('smthing went wrong');
            }
            else{
                console.log('orders are :');
                console.log(orders);
                res.json({orders:orders});
            }
        });
        
    });

    router.post('/payment',function(req,res){

        var payment = new Payment();

        var error=0;

        payment.firstname = req.body.firstname;

        payment.lastname = req.body.lastname;

        payment.shippingaddress = req.body.shippingaddress;

        payment.phonenumber = req.body.phonenumber;

        payment.postalcode = req.body.postalcode;


        if(req.body.firstname == null || req.body.firstname == "" || req.body.lastname == null || req.body.lastname == "" 
            || req.body.shippingaddress == null || req.body.shippingaddress == "" || req.body.phonenumber == null || req.body.phonenumber == ""
            || req.body.postalcode == null || req.body.postalcode == ""){

            res.json({success: false, message : 'Ensure shipping data'});
        }
        else{
            Cart.findOne({email: email_signed}).select('products').exec(function(err,prod){
                

                payment.products = prod;

                var items = prod.products;

                async.each(items,function(obj,callback){

                    Product.findOne({name : obj.name ,size : obj.size}).exec(function(err,item){

                       var new_quan = item.quantity - obj.quantity;

                       if(new_quan < 0){
                           new_quan=item.quantity;

                           var runout = new RunOut();

                           runout.description = 'call user : ' + email_signed + ' because of quantity problem';
                           
                           runout.save(); 
                       }

                       if(new_quan==0){
                         Product.deleteOne({name : obj.name ,size : obj.size},function(err){
                             if(err){
                                 console.log('err in del');
                             }
                             callback();
                         });
                       }
                       else{
                         Product.updateOne({name : obj.name ,size : obj.size},{$set: {quantity : new_quan }},function(err){
                             if(err){
                                console.log('err');
                             }
                             callback();
                         });
                       }
                    });
                });

                var query = {email : email_signed};
                var val = {$set:{'products' : [] }};

                Cart.updateMany(query,val,function(){
                    payment.save(function(err){
                    
                    if(err){
                        res.json({success: false,message: 'You have already placed this order'});
                    }
                    else{
                        res.json({success: true,message: 'Order submitted successfuly'});
                    }
                });
       
                });
            });
        }
    });

    router.get('/productdb', function(req,res){

        Product.find({})
        .exec(function(err,products){

            if(err){
                console.log('smthing went wrong');
            }
            else{
                res.json({products:products});
            }
        });
    });

    router.get('/cartdb', function(req,res){


        Cart.findOne({email: email_signed}).select('products').exec(function(err,prod){ 
            if(err){
                res.json({success: false, message: 'cart is empty'});
            }
            else{
                res.json({products : prod.products});
            } 
        });
            
    });

    router.post('/single',function(req,res){

        Product.find({name : req.body.name}).exec(function(err,prod){
            if(err){
                throw err;
            }
            else{
                
                res.json({product : prod});
            }
        });
        
    });

    router.post('/cartrmv',function(req,res){
        var query={email : email_signed};
        var newval = {$pull :{ products : {name : req.body.name,size : req.body.size}}};

        Cart.update(query,newval).exec(function(err){
            if(err){
                throw err;
            }
        });
    });

    router.get('/logout',function(req,res){
        isLoggedIn=false;
    });


    router.use(function(req, res, next){
        var token= req.body.token || req.body.query || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,secret,function(err,decoded){
                if(err){
                    res.json({success: false, message: 'Token invalid'});
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            res.json({success: false,message: 'No token provided'});
        }
    });
    
    router.post('/me',function(req,res){
        email_signed=req.decoded.email;
        isLoggedIn=true;
        res.send(req.decoded);
    });

    
    return router;
} 
