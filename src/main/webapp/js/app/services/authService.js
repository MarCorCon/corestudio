'use strict';

angular.module('corestudioApp.services')
.factory('authService', ['LOGIN_ENDPOINT', '$http', '$cookieStore', '$rootScope', function(LOGIN_ENDPOINT, $http, $cookieStore, $rootScope) {
        var auth = {};

        auth.login = function (username, password, callback) {
            return $http.post(LOGIN_ENDPOINT, $.param({username: username, password: password}), {
                headers : {
                    "content-type" : "application/x-www-form-urlencoded"
                }
        	}).success(function(data) {
                    this.authenticate(callback);
                });
        };

        auth.logout = function() {
            return $http.post(LOGOUT_ENDPOINT).then(function(response) {
                auth.user = undefined;
                $cookieStore.remove('user');
            })
        }

        auth.authenticate = function (callback) {
            $http.get('user').success(function(data) {
                if(data.name) {
                    $rootScope.authenticated = true;
                    $cookieStore.put('user', data.user);
                } else {
                    $rootScope.authenticated = false;
                    $cookieStore.remove('user');
                }
                callback && callback();
            }).error(function() {
                $rootScope.authenticated = false;
                $cookieStore.remove('user');
                callback && callback();
            });
        }

        return auth;
    }]);