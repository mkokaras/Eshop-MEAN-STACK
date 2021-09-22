angular.module('payServices',[])

.factory('Payment',function($http){
    payFactory = {};
    
    payFactory.create = function(paydata){
        return $http.post('/api/payment',paydata);
    }

    payFactory.loadProducts = function(prodData){
        return $http.get('/api/cartdb',prodData);   
    }

    return payFactory;
});
