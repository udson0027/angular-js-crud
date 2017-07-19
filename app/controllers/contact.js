'use strict';
window.frontApp.controller('ContactController', ['$scope', 'RestAPI', '$location', '$mdDialog',
function ($scope, RestAPI, $location, $mdDialog) {

    $scope.contacts = [];
    $scope.form = {};

    $scope.init = function () {
        fetch();
    };

    $scope.edit = function (id) {
        $location.path('/contact/' + id);
    };

    function fetch() {
        RestAPI.get(function (data) {
            $scope.contacts = data.objects;
        }, function () {
            erroMessage('Não foi possivel carregar a lista de contatos. Tente novamente mais tarde');
        });
    }

    $scope.openAddLayout = function (form) {
        form = {};
        $mdDialog.show({
            controller: 'ContactController',
            templateUrl: 'views/contact_add.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        })
            .then(function (contact) {
                RestAPI.save(contact, function (response) {
                    console.log(response);
                    fetch();
                }, function () {
                    erroMessage('Aconteceu algum problema quando tentamos ' +
                        'salvar o contato, por favor tente novamente mais tarde!');
                });
            }, function () {
                console.log('canceled');
            });
    };

    function erroMessage(msg) {
        var confirm = $mdDialog.confirm()
            .title('Ops...')
            .textContent(msg)
            .ariaLabel('Alerta de erro')
            .ok('OK');

        $mdDialog.show(confirm).then(function () {
            $mdDialog.cancel();
        });
    }

    $scope.save = function (form) {
        $mdDialog.hide(form);
    };

    $scope.cancelDialog = function () {
        $mdDialog.cancel();
    };
}]);
