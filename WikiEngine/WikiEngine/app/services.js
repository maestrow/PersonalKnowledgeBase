var mod = angular.module('services', ['ngResource']);

mod.factory('Page', ['$resource', function ($resource) {
    return $resource('api/Page/:pageId');
}])