"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rule for min lenght.
 */
var MinLenValidationRule = (function () {
    /**
     * inits rule.
     *
     * @param data
     * @param message
     */
    function MinLenValidationRule(propertyName, data, message) {
        this.propertyName = propertyName;
        this.data = data;
        this.message = message;
    }
    Object.defineProperty(MinLenValidationRule.prototype, "attribute", {
        /**
         * action key
         *
         * @returns {string}
         */
        get: function () {
            return 'minlen';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validation action
     *
     * @param value
     */
    MinLenValidationRule.prototype.validate = function (entity, value) {
        var _this = this;
        var promise = new Promise(function (resolve) {
            resolve(value.length >= _this.data);
        });
        return promise;
    };
    return MinLenValidationRule;
}());
exports.MinLenValidationRule = MinLenValidationRule;

//# sourceMappingURL=minLenValidationRule.js.map
