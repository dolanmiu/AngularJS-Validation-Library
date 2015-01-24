/*globals angular */
angular.module('web.forms').directive('grValidateMaxlength', function (RESPONSE_CODE, ValidationTemplate) {
    'use strict';

    var dir = ValidationTemplate.newInstance();
    var dirLink = dir.link;

    dir.controller = function () {
        var maxLength;
        this.validate = function (text, callback) {
            if (text.length > maxLength) {
                callback(RESPONSE_CODE.FORM.MAX_LENGTH_INVALID);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };

        this.setLength = function (length) {
            maxLength = length;
        };
    };

    dir.link = function (scope, elem, attrs, ctrl) {
        ctrl[1].setLength(attrs.grValidateMaxlength);
        dirLink(scope, elem, attrs, ctrl);
    };

    dir.require.push('grValidateMaxlength');
    return dir;
});