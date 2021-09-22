angular.module('orderController',['orderServices'])

.controller('orderCtrl',function($http,$scope,srvShareData,Orderdb,$filter) {
    var app=this;


    function loadOrders(){
        Orderdb.loadOrders().then(function(data){
            app.orders = data.data.orders;
        });
    }

    loadOrders();
    
});