/*globals angular */
//doesnt need ngTranclude because it is an attribute
angular.module('web.forms').service('ValidationTemplate', function () {
    'use strict';

    this.newInstance = function () {
        var directive = {
            restrict: 'A',
            require: ['input'],
            link: function (scope, elem, attrs, ctrl) {
                ctrl[0].addValidator(ctrl[1].validate);
            }
        };
        return directive;
    };
});

angular.module('web.forms').directive('input', function (UtilService, RESPONSE_CODE) {
    'use strict';

    function emitResponse(scope, elementID, response) {
        scope.$emit('validation:response', {
            element: elementID,
            response: response
        });
    }

    return {
        scope: {
            response: '=',
            handle: '=',
            responsepair: '='
        },
        controller: function ($scope, $element, $attrs) {
            var self = this;
            this.validators = [];

            this.update = function (responseCode) {
                $scope.response = responseCode;
            };

            this.addValidator = function (validator) {
                self.validators.push(validator);
            };

            this.reset = function () {
                console.log($element);
                $element.val('');
                $scope.response = undefined;
                self.validateField();
            }

            this.validateField = function () {
                var validatorIndex, currentValidator, currentResponse, validatedCount = 0;
                if ($attrs.grValidateRequired === undefined && $element.val() === '') {
                    $scope.response = RESPONSE_CODE.FORM.OK;
                    return;
                }

                for (validatorIndex = 0; validatorIndex < self.validators.length; validatorIndex += 1) {
                    currentResponse = undefined;
                    currentValidator = self.validators[validatorIndex];

                    currentValidator($element.val(), function (response) {
                        currentResponse = response;
                        emitResponse($scope, $element.attr('valid'), response);
                        if (validatedCount === self.validators.length - 1) {
                            if (response === RESPONSE_CODE.FORM.OK && $scope.response === RESPONSE_CODE.FORM.OK) {
                                $scope.response = RESPONSE_CODE.FORM.OK;
                                if ($attrs.responsepair !== undefined) {
                                    $scope.responsepair = RESPONSE_CODE.FORM.OK;
                                }
                            } else if (response !== RESPONSE_CODE.FORM.OK && $scope.response === RESPONSE_CODE.FORM.OK) {
                                $scope.response = currentResponse;
                                if ($attrs.responsepair !== undefined) {
                                    $scope.responsepair = currentResponse;
                                }
                            }
                        }
                        validatedCount += 1;
                    });

                    if (!UtilService.is(currentResponse)) {
                        continue;
                    }
                    $scope.response = currentResponse;
                    if ($attrs.responsepair !== undefined) {
                        $scope.responsepair = currentResponse;
                    }
                    if (currentResponse.toString() !== RESPONSE_CODE.FORM.OK) {
                        break;
                    }
                }
            }
        },
        link: function (scope, elem, attrs, ctrl) {
            if (attrs.response === undefined) { //prevent input directive from being active
                return;
            }

            var elementID = 'validate_' + UtilService.generateUUID();
            elem.attr('valid', elementID);

            if (attrs.handle !== undefined) {
                scope.handle = ctrl;
            }

            if (attrs.responsepair !== undefined) {
                //scope.responsepair = '2';
            }

            scope.$on('validation:errors', function (event, formId) {
                if (formId !== elem[0].form.id) {
                    return;
                }
                scope.active = true;

                if (attrs.grValidateRequired !== undefined || elem.val() !== '') { //if required or has text
                    if (elem.val() === '') {
                        scope.response = RESPONSE_CODE.FORM.REQUIRED;
                    }
                }
                emitResponse(scope, elem.attr('valid'), scope.response);
                scope.$apply();
            });

            if (attrs.grValidateOnblur !== undefined) {
                elem.bind('blur', function () {
                    scope.active = true;
                    ctrl.validateField();
                });
            } else {
                scope.active = true;
            }

            elem.bind('propertychange keyup paste change', function () {
                if (scope.active) {
                    ctrl.validateField();
                    scope.$apply();
                }
            });
        }
    };
});