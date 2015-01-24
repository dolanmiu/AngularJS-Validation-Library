/*globals angular */
angular.module('web.forms').directive('grValidateCard', function (FormValidator, ValidationTemplate, RESPONSE_CODE) {
    'use strict';
    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (text, callback) {
            if (FormValidator.validateCardNumber(text)) {
                callback(RESPONSE_CODE.FORM.OK);
            } else {
                callback(RESPONSE_CODE.FORM.INVALID);
            }
        };
    };
    dir.require.push('grValidateCard');
    return dir;

});