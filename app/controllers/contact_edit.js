'use strict';

window.frontApp.controller('ContactEditController', ['$scope', 'RestAPI', '$routeParams', '$location', '$mdDialog',
function ($scope, RestAPI, $routeParams, $location, $mdDialog) {

    var id = $routeParams.id;

    $scope.form = {};

    $scope.init = function () {
        RestAPI.get(function (contact) {
           $scope.form = contact;
        }, function () {
            error('Contato não encontrado, por favor tente mais tarde');
        }, id);
    };

    $scope.back = function () {
        $location.path('/');
    };

    $scope.save = function (form) {
        RestAPI.patch(form, function (response) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('Corfimação de Edição')
                    .textContent('Contato  '+ response.name + ' foi alterado com sucesso!')
                    .ariaLabel('Alerta de confirmação de edição')
                    .ok('OK')
            );
        }, function () {
            error('Não foi possivel alterar o contato, por favor tente mais tarde');
        });
    };

    $scope.delete = function (form) {
        var confirm = $mdDialog.confirm()
            .title('Exclusão do contato')
            .textContent('Realmente gostaria de excluir o contato: ' + form.name)
            .ariaLabel('Alerta de exclusão')
            .ok('Excluir')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            RestAPI.remove(form, function (result) {
                goToContactList(form);
            });
        }, function () {
            console.log('Not removed');
        });
    };

    function error(msg) {
        var confirm = $mdDialog.confirm()
            .title('Ops...')
            .textContent(msg)
            .ariaLabel('Alerta de erro')
            .ok('OK');

        $mdDialog.show(confirm).then(function () {
            $location.path('/');
        });
    }

    function goToContactList(form) {
        var confirm = $mdDialog.confirm()
            .title('Exclusão do contato')
            .textContent('Contato ' + form.name + ' excluido com sucesso!')
            .ariaLabel('Alerta de exclusão')
            .ok('OK');

        $mdDialog.show(confirm).then(function () {
            $location.path('/');
        });    
    }
}]);
