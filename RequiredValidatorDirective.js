/*globals angular */
angular.module('web.forms').directive('grValidateRequired', function (FormValidator, ValidationTemplate, RESPONSE_CODE) {
    'use strict';
    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (text, callback) {
            if (text === '') {
                callback(RESPONSE_CODE.FORM.REQUIRED);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };
    };

    dir.require.push('grValidateRequired');
    return dir;
});