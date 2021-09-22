angular.module('prodControllers',['prodServices'])

.controller('prodCtrl',function($http,$location,$timeout,Product){
    var app = this;
    
    
    this.enterProd=function(prodData){
        app.loading=true;
        app.errorMsg = false;

        Product.create(app.prodData).then(function(data){

            if(data.data.success){
                app.loading=false;
                app.successMsg= data.data.message;
                
            }
            else{
                app.loading=false;
                app.errorMsg= data.data.message;
            }
        });
    };
});
