"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rule for required.
 */
var RequiredValidationRule = /** @class */ (function () {
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
    RequiredValidationRule.prototype.validate = function (entity, value) {
        var promise = new Promise(function (resolve) {
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
