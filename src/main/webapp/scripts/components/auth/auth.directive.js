/**
 * Created by natete on 24/10/15.
 */

'use strict';

angular.module('corestudioApp')
    .directive('hasAuthority', ['Principal', function (Principal) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var setVisible = function () {
                        element.removeClass('hidden');
                    },
                    setHidden = function () {
                        element.addClass('hidden');
                    },
                    defineVisibility = function (reset) {

                        if (reset) {
                            setVisible();
                        }

                        Principal.hasAuthority(authority)
                            .then(function (result) {
                                if (result) {
                                    setVisible();
                                } else {
                                    setHidden();
                                }
                            });
                    },
                    authority = attrs.hasAuthority.replace(/\s+/g, '');

                if (authority.length > 0) {
                    defineVisibility(true);
                }
            }
        };
    }]);