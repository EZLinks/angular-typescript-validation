"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rule for required.
 */
var PhoneValidationRule = /** @class */ (function () {
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
        var promise = new Promise(function (resolve) {
            // https://stackoverflow.com/a/123666
            var regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
            resolve(value.match(regex));
        });
        return promise;
    };
    return PhoneValidationRule;
}());
exports.PhoneValidationRule = PhoneValidationRule;

//# sourceMappingURL=phoneValidationRule.js.map
