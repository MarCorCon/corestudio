/**
 * Created by natete on 24/10/15.
 */

'use strict';

angular.module('corestudioApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                data: {
                    authorities: [],
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/login/login.html',
                        controller: 'LoginController'
                    }
                },
                resolve: {

                }
            });
    });