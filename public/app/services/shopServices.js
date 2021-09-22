angular.module('shopServices',[])

.factory('Productdb',function($http){
    prodFactory = {};
    
    prodFactory.loadProducts = function(prodData){
        return $http.get('/api/productdb/',prodData);
    }

    return prodFactory;
});

