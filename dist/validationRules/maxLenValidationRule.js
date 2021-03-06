"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * validation rule for max length.
 */
var MaxLenValidationRule = /** @class */ (function () {
    /**
     * inits rule
     * @param data
     * @param message
     */
    function MaxLenValidationRule(propertyName, data, message) {
        this.propertyName = propertyName;
        this.data = data;
        this.message = message;
    }
    Object.defineProperty(MaxLenValidationRule.prototype, "attribute", {
        /**
         * action key.
         *
         * @returns {string}
         */
        get: function () {
            return 'maxlen';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action.
     * @param value
     */
    MaxLenValidationRule.prototype.validate = function (entity, value) {
        var _this = this;
        var promise = new Promise(function (resolve) {
            if (value === null || value === undefined) {
                resolve(true);
            }
            resolve(value.length <= _this.data);
        });
        return promise;
    };
    return MaxLenValidationRule;
}());
exports.MaxLenValidationRule = MaxLenValidationRule;

//# sourceMappingURL=maxLenValidationRule.js.map
