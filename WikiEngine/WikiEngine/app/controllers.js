var mod = angular.module('controllers', []);

mod.controller('PageList', ['$scope', 'Page', function($scope, Page) {

    $scope.items = Page.query();
}]);

mod.controller('PageItem', ['$scope', '$routeParams', 'Page', function ($scope, $routeParams, Page) {

    var toggleEditor = function($scope) {
        $scope.editorEnabled = !$scope.editorEnabled;
    };

    $scope.item = Page.get({ pageId: $routeParams.pageId });
    $scope.startEditing = function() {
        toggleEditor($scope);
    };

    $scope.save = function() {
        Page.save($scope.item.id, {
            createdAt: $scope.item.createdAt,
            lastEditAt: $scope.item.lastEditAt,
            title: $scope.item.title,
            content: $scope.item.content
        });
        toggleEditor($scope);
    };
}]);