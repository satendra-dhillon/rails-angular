var myApp = angular.module('myapplication', ['ngRoute', 'ngResource']);

/*Factoriesssss*/
myApp.factory('Users', ['$resource', function($resource){
	return $resource('/users.json', {}, {
		query: {method: 'GET', isArray: true },
		create: {method: 'POST'}
	})
}]);


myApp.factory('User', ['$resource', function($resource){
	return $resource('/users/:id.json', {}, {
		show: {method: 'GET' },
		update: { method: 'PUT', params:{id: '@id'}},
		delete: { method: 'DELETE', params: {id: '@id'}}
	});
}]);


myApp.controller("UserListCtr", ['$scope', '$resource', 'Users', 'User', '$location', function($scope, $resource, Users, User, $location){
	$scope.users = Users.query();
}])





/*Defining routes*/

myApp.config([
	'$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/users',{
			templateUrl: '/templates/users/index.html',
			controller: 'UserListCtr'
		});
		$routeProvider.when('/users/new', {
			templateUrl: '/templates/users/new.html',
			controller: 'UserAddCtr'
		});
		$routeProvider.when('/users/:id/edit',{
			templateUrl: '/templates/users/edit.html',
			controller: "UserUpdateCtr"
		});
		$routeProvider.otherwise({
			redirectTo: '/users'
		});
	}

	]);