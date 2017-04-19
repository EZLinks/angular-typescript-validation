"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rule for real time server validation.
 */
var RealTimeServerValidationRule = (function () {
    /**
     * inits rule
     *
     * @param validationCall
     * @param message
     */
    function RealTimeServerValidationRule(propertyName, validationCall, message) {
        this.propertyName = propertyName;
        this.validationCall = validationCall;
        this.message = message;
    }
    Object.defineProperty(RealTimeServerValidationRule.prototype, "attribute", {
        /**
         * action key
         *
         * @returns {string}
         */
        get: function () {
            return 'rtServerError';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action
     * @param value
     */
    RealTimeServerValidationRule.prototype.validate = function (value) {
        return this.validationCall(value);
    };
    return RealTimeServerValidationRule;
}());
exports.RealTimeServerValidationRule = RealTimeServerValidationRule;

//# sourceMappingURL=serverValidationRule.js.map
