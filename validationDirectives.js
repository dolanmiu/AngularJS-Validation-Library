/*globals angular, console */
/*jslint regexp:true */

angular.module('app.validation', [])
    .directive('asyncEmail', function ($http, $q, $timeout) {
        'use strict';
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {

                ctrl.$asyncValidators.uniqueEmail = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.when();
                    }

                    var def = $q.defer();

                    $timeout(function () {
                        return $http.get('http://localhost:3000/api/user/email/' + viewValue)
                            .success(function (data) {
                                console.log(data.userlist.length);
                                if (data.userlist.length === 0) {
                                    console.log('first loop conditions met');
                                    def.resolve();
                                    return true;
                                } else if (data.userlist.length === 1) {
                                    console.log('second loop conditions met');
                                    def.reject();
                                    //return false;
                                }
                            });
                    }, 2000);
                    console.log(def.promise);
                    return def.promise;
                };
            }
        };
    })
    .directive('syncEmail', function () {
        'use strict';
        var email_reg = /\S+([@])\w+([.])\w+.\w+/g;
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.uniqueEmail = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (email_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('syncUser', function () {
        'use strict';
        var user_reg = /^[a-z0-9_-]{3,16}$/;

        return {
            require: 'ngModel',
            link: function (scope, element, sttr, ctrl) {
                ctrl.$validators.uniqueUsername = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (user_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('syncpassword', function () {
        'use strict';
        var password_reg = /^[a-z0-9_-]{6,18}$/;

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.uniquePassword = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (password_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('onlyLetters', function () {
        'use strict';
        var letter_reg = /^[a-zA-Z]{2,20}$/;

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.onlyLetters = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    } else if (letter_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('onlyNumbers', function () {
        'use strict';
        var number_reg = /^[0-9]+$/;

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.onlyNumbers = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (number_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('alphaNumeric', function () {
        'use strict';
        var alphaNum_reg = /^[a-zA-Z0-9]+$/;

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.alphaNum = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    } else if (alphaNum_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('postcode', function () {
        'use strict';
        var postcode_reg = /^((GIR &0AA)|((([A-PR-UWYZ][A-HK-Y]?[0-9][0-9]?)|(([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRV-Y]))) &[0-9][ABD-HJLNP-UW-Z]{2}))$/;

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.postcode = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    } else if (postcode_reg.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        };
    })
    .directive('creditcard', function () {
        'use strict';

        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.validateCredit = function (modelValue, viewValue) {
                    if (/[^0-9-\s]+/.test(viewValue)) {
                        return false;
                    }

                    if (viewValue.length < 13) {
                        return false;
                    }

                    // The Luhn Algorithm.
                    var nCheck = 0,
                        nDigit = 0,
                        bEven = false,
                        cDigit,
                        n;
                    viewValue = viewValue.replace(/\D/g, '');

                    for (n = viewValue.length - 1; n >= 0; n -= 1) {
                        cDigit = viewValue.charAt(n);
                        nDigit = parseInt(cDigit, 10);

                        if (bEven) {
                            if ((nDigit *= 2) > 9) {
                                nDigit -= 9;
                            }
                        }

                        nCheck += nDigit;
                        bEven = !bEven;
                    }

                    return (nCheck % 10) === 0;
                };
            }
        };
    });