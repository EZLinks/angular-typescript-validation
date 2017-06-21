"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var isEmail_1 = require("validator/lib/isEmail");
/**
 * rule for required.
 */
var EmailValidationRule = (function () {
    /**
     * init rule
     *
     * @param message
     */
    function EmailValidationRule(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    Object.defineProperty(EmailValidationRule.prototype, "attribute", {
        /**
         * action key.
         *
         * @returns {string}
         */
        get: function () {
            return 'email';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action.
     *
     * @param value
     */
    EmailValidationRule.prototype.validate = function (entity, value) {
        var promise = new es6_promise_1.Promise(function (resolve) {
            resolve(isEmail_1.isEmail(value));
        });
        return promise;
    };
    return EmailValidationRule;
}());
exports.EmailValidationRule = EmailValidationRule;

//# sourceMappingURL=emailValidationRule.js.map
