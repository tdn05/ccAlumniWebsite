namespace ccalummiwebsite {

    angular.module('ccalummiwebsite', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: ccalummiwebsite.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: ccalummiwebsite.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: ccalummiwebsite.Controllers.LoginController,
                controllerAs: 'vm'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push("BearerAuthInterceptor")
    });

    angular.module('ccalummiwebsite').factory('BearerAuthInterceptor',
    ($window:ng.IWindowService, $q:ng.IQService)=>{
        return {
            request: function(config){
                config.headers = config.headers || {};

                if($window.localStorage.getItem('token')){
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
                }
                return config || $q.when(config)
            },
            response: function(response){
                if(response.status === 401) {

                }
                return response || $.when(response);
            }
        }
    });
}
