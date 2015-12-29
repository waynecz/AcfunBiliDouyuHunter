angular.module('ngApp', []).controller('PhoneListCtrl',
	function($scope, $http) {
		$http.get('phones/phones.json').success(function(data) {
			$scope.phones = data;
		})
		$scope.orderProp = 'name';
	})