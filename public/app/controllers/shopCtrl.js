angular.module('shopController',['shopServices','singleServices'])

.controller('DataCtrl2',function($http,$scope,srvShareData,Productdb,$filter) {
    var app=this;
    var orderBy = $filter('orderBy');



    function loadProducts(){
        Productdb.loadProducts().then(function(data){
            app.products = data.data.products;
        });
    }

    loadProducts();

    
    $scope.OrderGrid = function (orderByArg){
        Productdb.loadProducts().then(function(data){
            app.products = orderBy(data.data.products, orderByArg);
        });
    }

    app.dataToShare=[];

    this.shareMyData = function (myValue) {

        app.dataToShare = myValue;
        srvShareData.addData(app.dataToShare);
        
        window.location.href = "/single";
    }
});