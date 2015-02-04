﻿; (function ($) {
    angular.module('sfSortBox', ['sfServices'])
    .directive('sfSortBox', ['serverContext', function (serverContext) {
        return {
            restrict: 'AE',
            scope: {
                sfAction: '&',
                sfSortOptions: '@?',
            },
            templateUrl: function (elem, attrs) {
                var assembly = attrs.sfTemplateAssembly || 'Telerik.Sitefinity.Frontend';
                var url = attrs.sfTemplateUrl || 'client-components/sorting/sf-sort-box.html';
                return serverContext.getEmbeddedResourceUrl(assembly, url);
            },
            link: function (scope, element, attrs, ctrl) {
                if (!scope.sfAction) {
                    scope.showError = true;
                    throw { message: 'sf-action must be provided.' };
                }
                    
                if (!scope.sfSortOptions) {
                    /*
                    * Provides a list of supported sorting options.
                    */
                    scope.sfSortOptions = [
                    {
                        title: 'New-uploaded first',
                        value: 'DateCreated DESC'
                    }, {
                        title: 'New-modified first',
                        value: 'LastModified DESC'
                    }, {
                        title: 'Title (A-Z)',
                        value: 'Title ASC'
                    }, {
                        title: 'Title (Z-A)',
                        value: 'Title DESC'
                    }];
                }

                /*
                * The predefined sort expressions present in the user interface. Can have
                * following values:
                * null - No sorting
                * New-uploaded first - Orders items by DateCreated in descending order
                * New-modified first - Orders items by LastModified in descending order
                * Title (A-Z) - Orders items by Title in ascending order
                * Title (Z-A) - Orders items by Title in descending order
                */
                scope.sfModel = scope.sfSortOptions[0].value;
                scope.sfSortCallback = function () {
                    scope.sfAction({ sortExpression: scope.sfModel });
                };
            }
        };
    }]);
})(jQuery);