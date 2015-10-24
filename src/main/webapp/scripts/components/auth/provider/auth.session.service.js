/**
 * Created by natete on 24/10/15.
 */

'user strict';

angular.module('corestudioApp')
    .factory('AuthServerProvider', function ($http, localStorageService) {
        var authServer = {};

        authServer.login = function(credentials) {
            var data = 'username=' + encodeURIComponent(credentials.username) +
                    '&password=' + encodeURIComponent(credentials.password) +
                    '&submit=Login';

            return $http.post('api/authentication', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                return response;
            });
        };

        authServer.logout = function () {
            $http.post('api/logout').success(function (response) {
                localStorageService.clearAll();

                $http.get('api/account');
                return response;
            })
        };

        authServer.getToken = function () {
            var token = localStorageService.get('token');
            return token;
        };

        authServer.hasValidToken = function () {
            var token = this.getToken();
            return !!token;
        }

        return authServer;
    });