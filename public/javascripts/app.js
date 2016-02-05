angular.module('Nexus', ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/page/ac/entertainment");
		$stateProvider
		.state('page', {
				url: "/page",
				templateUrl: "partials/index.html",
				controller: function($scope, $http) {
					$http.get('setting/ac-sub-nav.json').success(function (data) {
						$scope.areas = data;
					});
				}
			})
			.state('page.ac', {
				url: "/ac/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $stateParams, $http) {
					
					if ($stateParams.area == '') {
						$stateParams.area = 'entertainment';
					};
					$http.get('crawlerData/acfun-' + $stateParams.area + '.json').success(function (data) {
						$scope.acfun = data;
					});
				}
			})
			.state('page.bili', {
				url: "/bili/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $stateParams, $http) {
					$http.get('crawlerData/bili-' + $stateParams.area + '.json').success(function(data) {
						$scope.acfun = data;
					});
				}
			})
			.state('page.dy', {
				url: "/dy/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $stateParams, $http) {
					$http.get('crawlerData/ac-' + $stateParams.area + '.json').success(function(data) {
						$scope.acfun = data;
					});
				},
				redirectTo: '/page'
			})

	})