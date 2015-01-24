/*globals angular */
angular.module('web.forms').directive('grValidateMobile', function (ValidationTemplate, RESPONSE_CODE) {
    'use strict';
    var dir = ValidationTemplate.newInstance();
    dir.controller = function () {
        this.validate = function (text, callback) {
            var re, result;
            re = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/i;
            result = re.test(text);

            if (!result) {
                callback(RESPONSE_CODE.FORM.INVALID);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };
    };

    dir.require.push('grValidateMobile');
    return dir;
});