var mod = angular.module('controllers', []);

mod.controller('PageList', ['$scope', 'Page', function($scope, Page) {

    //$scope.pages = [
    //    { title: '1111' },
    //    { title: '2222' },
    //    { title: '3333' }
    //];

    $scope.pages = Page.query();
}]);