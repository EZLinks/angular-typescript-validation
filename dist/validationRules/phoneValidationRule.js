"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var isMobilePhone_1 = require("validator/lib/isMobilePhone");
/**
 * rule for required.
 */
var PhoneValidationRule = (function () {
    /**
     * init rule
     *
     * @param message
     */
    function PhoneValidationRule(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    Object.defineProperty(PhoneValidationRule.prototype, "attribute", {
        /**
         * action key.
         *
         * @returns {string}
         */
        get: function () {
            return 'phone';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action.
     *
     * @param value
     */
    PhoneValidationRule.prototype.validate = function (entity, value) {
        var promise = new es6_promise_1.Promise(function (resolve) {
            resolve(isMobilePhone_1.isMobilePhone(value));
        });
        return promise;
    };
    return PhoneValidationRule;
}());
exports.PhoneValidationRule = PhoneValidationRule;

//# sourceMappingURL=phoneValidationRule.js.map
