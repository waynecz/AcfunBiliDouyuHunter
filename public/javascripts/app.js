angular.module('Nexus', ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/ac/entertainment");
		$stateProvider
			.state('page', {
				url: "/:site",
				templateUrl: "partials/index.html",
				controller: function($scope, $stateParams, $http) {
					$http.get('setting/' + $stateParams.site + '-sub-nav.json').success(function(data) {
						$scope.areas = data;
					});
				}
			})
			.state('page.ac', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $http, $state) {
					// console.log($state)

					if ($state.params.area == '') {
						$state.go('page.ac', {
							area: 'entertainment'
						})
						return;
					};
					var area = $state.params.area;
					$http.get('crawlerData/acfun-' + area + '.json').success(function(data) {
						$scope.acfun = data;
					});

					$scope.setUrl = function (thisUrl) {
						$scope.currentUrl = thisUrl;
					}
				}
			})
			.state('page.bili', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $http, $state) {
					if ($state.params.area == '') {
						$state.go('page.bili', {
							area: 'entertainment'
						})
						return;
					};
					var area = $state.params.area;
					$http.get('crawlerData/bili-' + area + '.json').success(function(data) {
						$scope.acfun = data;
					});
				}
			})
			.state('page.dy', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: function($scope, $http, $state) {
					if ($state.params.area == '') {
						$state.go('page.dy', {
							area: 'entertainment'
						})
						return;
					};
					var area = $state.params.area;
					$http.get('crawlerData/dy-' + area + '.json').success(function(data) {
						$scope.acfun = data;
					});
				}
			})

	})