/*globals angular */
angular.module('web.forms').directive('grValidateAlphanumeric', function (FormValidator, ValidationTemplate, RESPONSE_CODE) {
    'use strict';
    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (text, callback) {
            if (!FormValidator.validateAlphaNumeric(text)) {
                callback(RESPONSE_CODE.FORM.INVALID);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };
    };

    dir.require.push('grValidateAlphanumeric');
    return dir;
});