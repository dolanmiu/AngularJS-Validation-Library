/*globals angular */
angular.module('web.forms').directive('grValidatePostcode', function (FormValidator, ValidationTemplate, RESPONSE_CODE) {
    'use strict';
    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (text, callback) {
            if (text === '') {
                callback(RESPONSE_CODE.EMPTY);
                return;
            }
            
            if (!FormValidator.validatePostcode(text)) {
                callback(RESPONSE_CODE.FORM.INVALID);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };
    };

    dir.require.push('grValidatePostcode');
    return dir;
});