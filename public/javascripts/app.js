angular.module('Nexus', ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/list");
		$stateProvider
			.state('list', {
				url: "/list",
				templateUrl: "partials/list.html",
				controller: function($scope, $stateParams, $http) {
					$http.get('crawlerData/acfun.json').success(function(data) {
						$scope.acfun = data;
					});
				}
			})

	})