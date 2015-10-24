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
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            resolve: {
                user:['authService', '$q', function(authService, $q) {
                    if(authService.user) {
                        return $q.reject({authorized: true});
                    }
                }]
            },
            templateUrl: 'partials/login.html'
        }).state('home', {
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