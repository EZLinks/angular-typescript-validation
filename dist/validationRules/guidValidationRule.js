"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var isUUID_1 = require("validator/lib/isUUID");
/**
 * rule for required.
 */
var GuidValidationRule = (function () {
    /**
     * init rule
     *
     * @param message
     */
    function GuidValidationRule(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    Object.defineProperty(GuidValidationRule.prototype, "attribute", {
        /**
         * action key.
         *
         * @returns {string}
         */
        get: function () {
            return 'guid';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * validate action.
     *
     * @param value
     */
    GuidValidationRule.prototype.validate = function (entity, value) {
        var promise = new es6_promise_1.Promise(function (resolve) {
            var isValueDefined = !!value;
            var isValueNotEmptyGuid = value !== '00000000-0000-0000-0000-000000000000';
            var isValidGuid = isUUID_1.isUUID(value);
            resolve(isValueDefined && isValueNotEmptyGuid && isValidGuid);
        });
        return promise;
    };
    return GuidValidationRule;
}());
exports.GuidValidationRule = GuidValidationRule;

//# sourceMappingURL=guidValidationRule.js.map
