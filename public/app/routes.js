angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'app/views/pages/home.html'

    })
    .when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })
    .when('/login',{
        templateUrl: 'app/views/pages/users/login.html'
    })
    .when('/team',{
        templateUrl: 'app/views/pages/team.html'
    })
    .when('/contact',{
        templateUrl: 'app/views/pages/contact.html'
    })
    .when('/shop',{
        templateUrl: 'app/views/pages/shop.html',
        controller: 'DataCtrl2',
        controllerAs: 'shop'
    })
    .when('/admin',{
        templateUrl: 'app/views/pages/admin/admin.html',
        controller: 'prodCtrl',
        controllerAs: 'product'
    })
    .when('/checkout',{
        templateUrl: 'app/views/pages/checkout.html',
        controller : 'cartCtrl',
        controllerAs: 'cart'
    })
    .when('/logout', {
        templateUrl: 'app/views/pages/users/logout.html'
    })

    .when('/thankyou',{
        templateUrl: 'app/views/pages/thankyou.html'
    })

    .when('/payment', {
        templateUrl: 'app/views/pages/payment.html',
        controller : 'payCtrl',
        controllerAs : 'pay'
    })
    .when('/single',{
        templateUrl: 'app/views/pages/single.html',
        controller: 'singleCtrl',
        controllerAs: 'single'

    })
    .when('/orders',{
        templateUrl: 'app/views/pages/admin/orders.html',
        controller: 'orderCtrl',
        controllerAs: 'order'
    })
    .otherwise({ redirectTo: '/'} );

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});
