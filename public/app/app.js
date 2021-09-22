angular.module('userApp',['appRoutes','userControllers','userServices','mainController','authServices','prodControllers','prodServices','shopController','shopServices','cartController','cartServices','payController','payServices','singleControllers','singleServices','orderController','orderServices','angular.filter'])


.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});