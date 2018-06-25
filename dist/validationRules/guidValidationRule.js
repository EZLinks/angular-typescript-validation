"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rule for required.
 */
var GuidValidationRule = /** @class */ (function () {
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
            var regex = /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/;
            var isValidGuid = isValueDefined && isValueNotEmptyGuid && value.match(regex) !== null;
            resolve(isValidGuid);
        });
        return promise;
    };
    return GuidValidationRule;
}());
exports.GuidValidationRule = GuidValidationRule;

//# sourceMappingURL=guidValidationRule.js.map
