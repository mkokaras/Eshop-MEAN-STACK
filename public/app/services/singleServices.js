angular.module('singleServices',[])
.factory('getProduct',function($http){
    prodFactory={};

    prodFactory.loadProducts = function(prodData){
        return $http.post('/api/single',prodData[0]);
        
    }

    prodFactory.send = function(productname){
        return $http.post('/api/cart',productname);
    }

    return prodFactory;
})
.service('srvShareData', function($window) {

    var KEY = 'App.SelectedValue';

    var addData = function(newObj) {

        var mydata = $window.sessionStorage.getItem(KEY);


        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }

        mydata.push(newObj);

        $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
    };

    var getData = function(){

        var mydata = $window.sessionStorage.getItem(KEY);
        
        sessionStorage.clear();

       if (mydata) {
            mydata = JSON.parse(mydata);
        }

        return mydata || [];
    };

    return {
        addData: addData,
        getData: getData
    };
});