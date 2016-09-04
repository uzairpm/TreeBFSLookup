var myApp = angular.module('myApp', ['ngRoute' , 'ngStorage']);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'homeController',
			templateUrl: 'templates/home.html'
		})

		.when('/first_page', {
			controller: 'resultController',
			templateUrl: 'templates/result_page.html'
		})
}]);
