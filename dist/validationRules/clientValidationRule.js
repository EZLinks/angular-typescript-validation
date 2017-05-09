"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
/**
 * rule for client custom validation.
 */
var ClientValidationRule = (function () {
    /**
     * inits rule
     *
     * @param validationCall
     * @param message
     */
    function ClientValidationRule(propertyName, validationCall, message) {
        this.propertyName = propertyName;
        this.validationCall = validationCall;
        this.message = message;
    }
    Object.defineProperty(ClientValidationRule.prototype, "attribute", {
        /**
         * action key
         *
         * @returns {string}
         */
        get: function () {
            return 'clientCustom';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action
     * @param value
     */
    ClientValidationRule.prototype.validate = function (entity, value) {
        var _this = this;
        var promise = new es6_promise_1.Promise(function (resolve) {
            var result = _this.validationCall(entity, value);
            resolve(result);
        });
        return promise;
    };
    return ClientValidationRule;
}());
exports.ClientValidationRule = ClientValidationRule;

//# sourceMappingURL=clientValidationRule.js.map
