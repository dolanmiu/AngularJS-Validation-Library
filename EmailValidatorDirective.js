/*globals angular */
angular.module('web.forms').directive('grValidateEmail', function (FormValidator, RegistrationService, RESPONSE_CODE, ValidationTemplate) {
    'use strict';

    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (email, callback) {
            if (!FormValidator.validateEmail(email)) {
                callback(RESPONSE_CODE.FORM.EMAIL_INVALID);
                return;
            }
        };
    };
    
    dir.require.push('grValidateEmail');
    return dir;
});