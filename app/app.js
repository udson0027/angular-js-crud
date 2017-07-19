'use strict';

window.frontApp = angular.module('frontApp', [
    'ngRoute',
    'ngMaterial',
    'restangular',
    'ngMask'
]).config(['$locationProvider', '$routeProvider', 'RestangularProvider',
function($locationProvider, $routeProvider, RestangularProvider){

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
    .when('/', {
        controller: 'ContactController',
        templateUrl: '/views/contact_list.html'
    })
    .when('/contact/:id', {
        controller: 'ContactEditController',
        templateUrl: '/views/contact_edit.html'
    });

    $routeProvider.otherwise({redirectTo: '/'});

    RestangularProvider.setBaseUrl('http://api.pipz.io/v1/');
    RestangularProvider.setDefaultHeaders({
        Authorization: 'Basic ' + btoa('9dd7eb37e0b8f60432803:24c251e29b00366a7c')
    });
}]);