'use strict';

window.frontApp.service('RestAPI', function (Restangular) {

    var rest = Restangular;

    function getList (success, error) {
        rest.all('contact').customGET().then(success, error);
    };

    function getById (success, error, id) {
        rest.one('contact', id).get().then(success, error);
    }

    this.get = function(success, error, id) {
        if (id) {
            getById(success, error, id);
        } else {
            getList(success, error);
        }
    };

    this.patch = function(contact, success, error) {
        rest.one('contact', contact.id)
            .patch({
                name: contact.name,
                email: contact.email,
                twitter: contact.twitter,
                phone: contact.phone
            })
            .then(success, error);
    };

    this.remove = function(contact, success, error) {
        contact.remove().then(success, error);
    };

    this.save = function(contact, success, error) {
        console.log(contact);
        rest.all('contact')
            .post(contact).then(success, error);
    };
});
