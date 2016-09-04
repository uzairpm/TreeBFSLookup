var myApp = angular.module('myApp');

myApp.controller('homeController',
	['$scope', '$location', function($scope, $location) {
	$scope.save=function() {
		localStorage.searchNumber = $scope.searchNumber;
		$location.path("first_page");
	}
}]);
