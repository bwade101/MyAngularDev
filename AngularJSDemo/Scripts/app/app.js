var EmpApp = angular.module('EmpApp', [
    'ngRoute',
    'EmpControllers'
]);

EmpApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/list', {
        templateUrl: 'Employee/list.html'
        //controller: 'ListController'
    }).
    when('/create', {
        templateUrl: 'Employee/edit.html'
        //controller: 'EditController'
    }).
    when('/edit/:id', {
        templateUrl: 'Employee/edit.html'
        //controller: 'EditController'
    }).
    when('/delete/:id', {
        templateUrl: 'Employee/delete.html'
        //controller: 'DeleteController'
    }).
    otherwise({
        redirectTo: '/list'
    });

    //$locationProvider.html5Mode(true);
}]);