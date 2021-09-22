angular.module('prodServices',[])

.factory('Product',function($http){
    prodFactory = {};
    
    prodFactory.create = function(prodData){
        return $http.post('/api/products',prodData);
    }
    return prodFactory;
});
