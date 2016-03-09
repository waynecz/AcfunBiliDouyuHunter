var Nexus = angular.module('Nexus', ["ui.router", "ngMaterial"]);
// 
// Routers
Nexus
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
					$scope.refresh = function() {
						$http.get('/f5').success(function(data) {
							console.log(data);
						});
					}
				}
			})
			.state('page.ac', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: 'listCtrl'
			})
			.state('page.bili', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: 'listCtrl'
			})
			.state('page.dy', {
				url: "/:area",
				templateUrl: "partials/list.html",
				controller: 'listCtrl'
			})

	});
// Controllers
Nexus
	.controller('listCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
		var area = $state.params.area;
		if (area == '') {
			$state.go($state.current.name, {
				area: 'entertainment'
			})
			return;
		};
		$http.get('crawlerData/' + $state.params.site + '-' + area + '.json').success(function(data) {
			$scope.topics = data;
		});

		$scope.setUrl = function(thisUrl) {
			$scope.currentUrl = thisUrl;
		}
	}])
	// Directives
Nexus
	.directive('refresh', [function() {
		return {
			restrict: 'A',
			scope: true,
			link: function(scope, iElement, iAttrs) {
				iElement.bind('click', function() {
					scope.$apply('refresh()')
				})
			}
		};
	}])