/**
 * Created by natete on 24/10/15.
 */


'use strict';

angular.module('corestudioApp')
    .factory('Principal', ['$q', 'Account', function($q, Account) {
        var _identity;
        var _authenticated = false;

        var principal = {};

        principal.isIdentityResolved = function () {
            return angular.isDefined(_identity);
        };

        principal.isAuthenticated = function() {
            return _authenticated;
        };

        principal.hasAuthority = function (authority) {
            if (!_authenticated) {
                return $q.when(false);
            }

            return principal.identity().then(function(_id) {
                return _id.authorities && _id.authorities.indexOf(authority) !== -1;
            }, function(err) {
                return false;
            });
        };

        principal.hasAnyAuthority = function (authorities) {
            if (!_authenticated || !_identity || !_identity.authorities) {
                return false;
            }

            forEach(authorities, function (authority) {
                if(_identity.authorities.indexOf(authority) !== -1) {
                    return true;
                }
            });

            return false;
        };

        principal.authenticate = function (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        };

        principal.identity = function (force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            Account.get().$promise
                .then(function (account) {
                    _identity = account.data;
                    _authenticated = true;
                    deferred.resolve(_identity);
                })
                .catch(function () {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                });
            return deferred.promise;
        };

        return principal;
    }]);