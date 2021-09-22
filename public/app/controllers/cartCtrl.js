angular.module('cartController',['cartServices'])

.controller('cartCtrl',function($http,$scope,Cartdb,$location,$timeout,$route) {
    var app=this;

    var full_price=0;

    app.price = 0;


    function loadProducts(){
        Cartdb.loadProducts().then(function(data){
            app.products = data.data.products;

            if(app.products == null){
            
            }
            else{
            for(var i=0; i<data.data.products.length;i++){
                var obj = data.data.products[i];

                if(obj.quantity>1){
                    full_price = full_price  + obj.quantity * obj.price;
                }
                else{
                    full_price = full_price + obj.price;
                }
            }

            app.price= full_price;
        }
            
        });
    }

    loadProducts();

    this.rmvProduct=function(rmvdata){
        Cartdb.rmvProduct(rmvdata).then(function(data){ 
        });
        $route.reload();
 
    };

});