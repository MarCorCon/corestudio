/**
 * Created by natete on 24/10/15.
 */

'use strict';

angular.module('corestudioApp')
.factory('AuthService', ['$rootScope', '$state', '$q', 'Principal', 'AuthServerProvider',
        function ($rootScope, $state, $q, Principal, AuthServerProvider) {
            var auth = {};

            auth.login = function (credentials, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                AuthServerProvider.login(credentials).then(function (data) {
                    Principal.identity(true).then(function (account) {
                        deferred.resolve(data);
                    });
                    return cb();
                }).catch(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            };

            auth.logout = function () {
                AuthServerProvider.logout();
                // Remove Principal
                Principal.authenticate(null);
                // Reset state
                $rootScope.previousStateName = undefined;
                $rootScope.previousStateNameParams = undefined;
            };

            auth.authorize = function (force) {
                return Principal.inentity(force)
                    .then(function () {
                        var isAuthenticated = Principal.isAuthenticated();

                        if (isAuthenticated && $rootScope.toState.name === 'login') {
                            $state.go('home');
                        }

                        if ($rootScope.toState.data.authorities
                                && $rootScope.toState.data.authorities.length > 0
                                && !Principal.hasAnyAuthority($rootScope.toState.data.authorities)) {
                            if(isAuthenticated) {
                                // TODO redirect to access denied
                                $state.go('home');
                            } else {
                                // User not authenticated. Get state before redirect to login
                                $rootScope.previousStateName = $rootScope.toState;
                                $rootScope.previousStateNameParams = $rootScope.toStateParams;

                                $state.go('login');
                            }
                        }
                    });
            };

            return auth;
        }]);