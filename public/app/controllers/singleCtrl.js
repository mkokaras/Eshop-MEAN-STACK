
angular.module('singleControllers',['singleServices'])

.controller('singleCtrl',function($http,srvShareData,getProduct,$location){
    var app = this;
    app.sharedData = srvShareData.getData();
    app.errorMsg=false;

    function loadProducts(){
        getProduct.loadProducts(app.sharedData).then(function(data){

            app.products = data.data.product;
        });
    }

    loadProducts();
        
    this.enterProductCart = function(productname){
        getProduct.send(productname).then(function(data){
            
            if(data.data.success){
                app.successMsg = data.data.message;
            }
            else{
                app.errorMsg = data.data.message;
            }
            
        });
    };

});
