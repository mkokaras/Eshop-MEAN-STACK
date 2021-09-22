angular.module('cartServices',[])

.factory('Cartdb',function($http){
    cartFactory = {};
    
    cartFactory.loadProducts = function(prodData){
        return $http.get('/api/cartdb',prodData);   
    }

    cartFactory.rmvProduct = function(rmvData){
        return $http.post('/api/cartrmv',rmvData);
    }


    return cartFactory;
});

