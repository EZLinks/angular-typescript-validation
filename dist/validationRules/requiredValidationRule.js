"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
/**
 * rule for required.
 */
var RequiredValidationRule = (function () {
    /**
     * init rule
     *
     * @param message
     */
    function RequiredValidationRule(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    Object.defineProperty(RequiredValidationRule.prototype, "attribute", {
        /**
         * action key.
         *
         * @returns {string}
         */
        get: function () {
            return 'required';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action.
     *
     * @param value
     */
    RequiredValidationRule.prototype.validate = function (value) {
        var promise = new es6_promise_1.Promise(function (resolve) {
            var notDefined = false;
            if (value === null || value === undefined || value === '') {
                notDefined = true;
            }
            resolve(!notDefined);
        });
        return promise;
    };
    return RequiredValidationRule;
}());
exports.RequiredValidationRule = RequiredValidationRule;

//# sourceMappingURL=requiredValidationRule.js.map
