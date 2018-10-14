var app = angular.module('app', ['ngRoute'])

app.config(function($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', {templateUrl: 'views/default.html', controller: 'defaultSidebarController'})
        .when('/:city', {templateUrl: 'views/city.html', controller: 'cityController'})

    // $locationProvider.html5Mode(true); // Disabled so this can run on a static web server
});

app.controller('mapController', ['$scope', '$location', function($scope, $location)
{
    $scope.stateClicked = (state) =>
    {
        switch (state)
        {
            case 'sa': $location.path('/adelaide'); break;
            case 'wa':$location.path('/perth'); break;
            case 'nsw':$location.path('/sydney'); break;
            case 'qld':$location.path('/brisbane'); break;
            case 'nt':$location.path('/darwin'); break;
            case 'act':$location.path('/canberra'); break;
            case 'tas':$location.path('/hobart'); break;
            case 'vic':$location.path('/melbourne'); break;
            default:
                console.error('State was clicked but not handled by switch (' + state + ')'); break;
        }
    };
}]);

app.controller('defaultSidebarController', ['$scope', function($scope)
{
    $scope.title = 'Australian City Subreddit Stats';
    $scope.description = 'Click on a state to view its capital subreddit\'s post statistics.\n' +
                         'Graphs will appear below showing the topic makeup of each subreddit\'s posts.';
}]);

app.controller('cityController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http)
{
    // Found at https://stackoverflow.com/a/1026087
    var titlecasedCity = $routeParams.city.charAt(0).toUpperCase() + $routeParams.city.slice(1);

    $scope.title = titlecasedCity;

    $http.get('/data/' + $routeParams.city + '.json')
        .then(
            (r) =>
            {
                $scope.stats = angular.fromJson(r.data);
            }
        );
}]);
