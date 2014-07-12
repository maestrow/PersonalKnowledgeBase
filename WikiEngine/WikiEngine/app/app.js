var mod = angular.module('wikiEngineApp', [
    'ngRoute',

    'controllers',
    'services'
]);

mod.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/page', {
            templateUrl: 'app/layout/PageList.html',
            controller: 'PageList'
        })
        .when('/page/:pageId', {
            templateUrl: 'app/layout/PageItem.html',
            controller: 'PageItem'
        })
        .otherwise({ redirectTo: '/page' });
}]);