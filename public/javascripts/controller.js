var Nexus = angular.module('Nexus', [])
	Nexus.controller('PhoneListCtrl',
		function($scope, $http) {
				$scope.list = ["nexux 6P", "nexus 5X"];
			})
		})
	Nexus.controller('PhoneDetCtrl',
		function($scope, $routeParams, $http) {
			$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
				$scope.phone = data;
			})
		})