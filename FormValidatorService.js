/*globals angular */
angular.module('web.forms').service('FormValidator', function () {
    'use strict';
    var calculatePasswordStrength;

    this.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    this.validateOnlyLetters = function (text) {
        var re = /^[a-zA-Z]+$/;
        return re.test(text);
    };

    this.validateLettersAndSpaces = function (text) {
        var re = /^[a-zA-Z ]+$/;
        return re.test(text);
    };

    this.validateOnlyNumbers = function (number) {
        var re = /^\d+$/;
        return re.test(number);
    };

    this.validatePostcode = function (postcode) {
        postcode = postcode.toUpperCase();
        var re = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/;
        return re.test(postcode);
    };

    this.checkPasswordStrength = function (password) {
        var score = calculatePasswordStrength(password);
        if (score >= 100) {
            score = 100;
        }
        return score;
    };

    this.validateAlphaNumeric = function (text) {
        var re = /^[a-zA-Z0-9 ]+$/;
        return re.test(text);
    };
    
    this.validateLength = function (text, value) {
        var strLength = text.length;
        if (strLength === value) {
            return true;   
        } else {
            return false;   
        }
    };

    this.validateCardNumber = function (value) {
        if (/[^0-9-\s]+/.test(value)) {
            return false;
        }
        
        if (value.length < 13) {
            return false;   
        }

        // The Luhn Algorithm.
        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            cDigit,
            n;
        value = value.replace(/\D/g, '');

        for (n = value.length - 1; n >= 0; n -= 1) {
            cDigit = value.charAt(n);
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

    calculatePasswordStrength = function (p) {
        var intScore = 0;
        // PASSWORD LENGTH
        intScore += p.length;

        if (p.length > 0 && p.length <= 4) { // length 4 or less
            intScore += p.length;
        } else if (p.length >= 5 && p.length <= 7) { // length between 5 and 7
            intScore += 6;
        } else if (p.length >= 8 && p.length <= 15) { // length between 8 and 15
            intScore += 12;
        } else if (p.length >= 16) { // length 16 or more
            intScore += 18;
        }

        // LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
        if (p.match(/[a-z]/)) { // [verified] at least one lower case letter
            intScore += 1;
        }
        if (p.match(/[A-Z]/)) { // [verified] at least one upper case letter
            intScore += 10;
        }
        // NUMBERS
        if (p.match(/\d/)) { // [verified] at least one number
            intScore += 20;
        }
        if (p.match(/.*\d.*\d.*\d/)) { // [verified] at least three numbers
            intScore += 20;
        }

        // SPECIAL CHAR
        if (p.match(/[!,@,#,$,%,^,&,*,?,_,~]/)) { // [verified] at least one special character
            intScore += 30;
        }
        // [verified] at least two special characters
        if (p.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/)) {
            intScore += 40;
        }

        // COMBOS
        if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) { // [verified] both upper and lower case
            intScore += 10;
        }
        if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) { // [verified] both letters and numbers
            intScore += 10;
        }
        // [verified] letters, numbers, and special characters
        if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            intScore += 10;
        }

        return intScore;
    };
});