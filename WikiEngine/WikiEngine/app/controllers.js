var mod = angular.module('controllers', []);

mod.controller('PageList', ['$scope', 'Page', function($scope, Page) {

    $scope.items = Page.query();
}]);

mod.controller('PageItem', ['$scope', '$routeParams', 'Page', function ($scope, $routeParams, Page) {

    $scope.item = Page.get({ pageId: $routeParams.pageId });
}]);