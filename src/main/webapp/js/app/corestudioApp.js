/**
 * Created by natete on 17/10/15.
 */
'use strict';

angular.module('corestudioApp', [
                                    'ui.router',
                                    'ngCookies',
                                    'LocalStorageModule',
                                    'corestudioApp.controllers',
                                    'corestudioApp.services',
                                    'corestudioApp.security',
                                    'ngResource']);

angular.module('corestudioApp')
    .run(function($rootScope, $state, Principal, Auth) {
    	
        $rootScope.$on('$stateChangeStart', function (evente, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (Principal.isIdentityResolved()) {
                Auth.authorize();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'login' && $rootScope.previousStateName) {
                $rootScope.previousStateName = fromState.name;
                $rootScope.previousStateParams = fromParams;
            }
        });
        
        $rootScope.back = function() {
            // If previous state is 'activate' or do not exist go to 'home'
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeController',
            resolve: {
                user: ['authService', '$q', function(authService, $q) {
                    return authService.user || $q.reject({unAuthorized: true});
                }]
            },
            templateUrl: 'partials/home.html'
        }).state('professor', {
            url: '/professor',
            controller: 'ProfessorController',
            resolve: {
                user: ['authService', '$q', function(authService, $q) {
                    return authService.user || $q.reject({unAuthorized: true});
                }]
            },
            templateUrl: 'partials/professors/professor_details.html'
        })
        ;

        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);


    }]);

angular.module('corestudioApp.services', []);
angular.module('corestudioApp.controllers', []);