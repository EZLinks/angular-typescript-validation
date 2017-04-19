"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
/**
 * validation rule for max length.
 */
var MaxLenValidationRule = (function () {
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
    MaxLenValidationRule.prototype.validate = function (value) {
        var _this = this;
        var promise = new es6_promise_1.Promise(function (resolve) {
            resolve(value.length <= _this.data);
        });
        return promise;
    };
    return MaxLenValidationRule;
}());
exports.MaxLenValidationRule = MaxLenValidationRule;

//# sourceMappingURL=maxLenValidationRule.js.map
