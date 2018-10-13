var app = angular.module('app', [])

app.controller('mapController', ['$scope', function($scope)
{
    $scope.stateClicked = (state) =>
    {
        console.log(state);
        switch (state)
        {
            case 'sa':
                break;
            case 'wa':
                break;
            case 'nsw':
                break;
            case 'qld':
                break;
            case 'nt':
                break;
            case 'act':
                break;
            case 'tas':
                break;
            case 'vic':
                break;
        }
    };
}]);
