var app = angular.module('app', ['ngRoute'])

app.config(function($routeProvider, $locationProvider)
{
    $locationProvider.html5Mode(true);
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
