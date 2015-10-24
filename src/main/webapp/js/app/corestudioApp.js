/**
 * Created by natete on 17/10/15.
 */
'use strict';

angular.module('corestudioApp', [
                                    'ui.router',
                                    'ngCookies',
                                    'LocalStorageModule',
                                    'ngResource']);

angular.module('corestudioApp')
    .run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (evente, toState, toStateParams, Principal, Auth) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (Principal.isIdentityResolved()) {
                Auth.authorize();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (toState.name !== 'login' && $rootScope.previousStateName) {
                $rootScope.previousStateName = fromState.name;
                $rootScope.previousStateParams = fromParams;
            }
        });
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

        $urlRouterProvider.otherwise('/');

    }]);
