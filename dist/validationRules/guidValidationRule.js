"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var promise = new Promise(function (resolve) {
            var isValueDefined = !!value;
            var isValueNotEmptyGuid = value !== '00000000-0000-0000-0000-000000000000';
            // https://stackoverflow.com/a/7905992
            var regex = /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F‌​]{4}-[0-9a-fA-F]{12}‌​\}?$/;
            var isValidGuid = value.match(regex);
            resolve(isValueDefined && isValueNotEmptyGuid && isValidGuid);
        });
        return promise;
    };
    return GuidValidationRule;
}());
exports.GuidValidationRule = GuidValidationRule;

//# sourceMappingURL=guidValidationRule.js.map
