
angular.module('payController',['payServices'])

.controller('payCtrl',function($http,$location,$timeout,Payment){
    var app = this;
    app.show = true;
    app.price = 0;

    var full_price=0;

    function loadProducts(){
        Payment.loadProducts().then(function(data){
            for(var i=0; i<data.data.products.length;i++){
                var obj = data.data.products[i];
                full_price = full_price + obj.quantity*obj.price;
            }

            app.price = full_price;
            
            console.log(full_price);

            if(app.price == 0){
                app.show = false;
            }
            else {
                app.show = true;
            }

        });
    }

    loadProducts();
    
    this.enterOrder=function(paydata){
        app.loading=true;
        app.errorMsg = false;

        Payment.create(app.paydata).then(function(data){

            if(data.data.success){
                app.loading=false;
                app.successMsg= data.data.message;

                $location.path('/thankyou');

                $timeout(function(){
                    $location.path('/');
                },4000);
            }
            else{
                app.loading=false;
                app.errorMsg= data.data.message;
            }

        });
    };

   



});