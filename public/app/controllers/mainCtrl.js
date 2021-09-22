angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope){
    var app = this;


    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){

            app.isLoggedIn = true;

            app.isAdmin = false;

            Auth.getUser().then(function(data){
                if(data.data.email == 'mkokaras@uth.gr'){
                    app.isAdmin = true;
                }
            });
        }
        else{
            app.isLoggedIn = false;
            app.isAdmin = false;
        }
    });
    
    this.doLogin=function(loginData){

        app.loading=true;
        app.errorMsg = false;

        Auth.login(app.loginData).then(function(data){

            if(data.data.success){
                app.loading = false;

                app.successMsg = data.data.message;

                $timeout(function(){
                    $location.path('/');
                    app.loginData = {};
                    app.successMsg = false;
                },2000);
                
            }
            else{
                app.loading=false;
                app.errorMsg= data.data.message;
            }
        });
    };

    this.logout = function() {
        Auth.logout();

        $location.path('/logout');

        $timeout(function(){
            $location.path('/');
        },2000);
    };
});


