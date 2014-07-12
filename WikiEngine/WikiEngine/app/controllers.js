var mod = angular.module('controllers', []);

mod.controller('PageList', ['$scope', 'Page', function($scope, Page) {

    $scope.items = Page.query();
}]);