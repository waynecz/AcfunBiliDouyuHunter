angular.module('Nexus', ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/page/ac/entertainment");
		$stateProvider
		.state('page', {
				url: "/page",
				templateUrl: "partials/index.html",
				controller: function($scope) {
						$scope.lists = ['ac-enter'];
				}
			})
			.state('page.ac', {
				url: "/ac/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $stateParams, $http) {
					$http.get('crawlerData/acfun-' + $stateParams.area + '.json').success(function(data) {
						$scope.acfun = data;
					});
				}
			})

	})