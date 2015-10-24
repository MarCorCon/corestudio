/**
 * Created by natete on 24/10/15.
 */

'use strict';

angular.module('corestudioApp')
    .factory('Account', ['$resource', function Account($resource) {
        return $resource('api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });
    }]);