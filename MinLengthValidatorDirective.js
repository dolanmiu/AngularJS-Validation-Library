/*globals angular */
angular.module('web.forms').directive('grValidateMinlength', function (RESPONSE_CODE, ValidationTemplate) {
    'use strict';

    var dir = ValidationTemplate.newInstance();
    var dirLink = dir.link;
    
    dir.controller = function () {
        var minLength;
        this.validate = function (text, callback) {
            if (text.length < parseInt(minLength)) {
                callback(RESPONSE_CODE.FORM.MIN_LENGTH_INVALID);
            } else {
                callback(RESPONSE_CODE.FORM.OK);
            }
        };

        this.setLength = function (length) {
            minLength = length;
        };
    };

    dir.link = function (scope, elem, attrs, ctrl) {
        ctrl[1].setLength(attrs.grValidateMinlength);
        dirLink(scope, elem, attrs, ctrl);
    };

    dir.require.push('grValidateMinlength');
    return dir;
});