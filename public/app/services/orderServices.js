angular.module('orderServices',[])

.factory('Orderdb',function($http){
    orderFactory = {};
    
    orderFactory.loadOrders = function(ordData){
        return $http.get('/api/orders',ordData);
    }

    return orderFactory;
});

