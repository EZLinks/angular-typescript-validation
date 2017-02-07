"use strict";
require("angular");
/**
 * base methods for validation purposes.
 */
var ValidationUtilities = (function () {
    /* istanbul ignore next */ function ValidationUtilities() {
    }
    /**
     * tries to find controller in scope
     *
     * @param scope
     */
    ValidationUtilities.getController = function (scope) {
        for (var property in scope) {
            if (scope.hasOwnProperty(property)) {
                var candidate = scope[property];
                var isController = candidate && candidate.rulesCustomizer !== undefined
                    && candidate.formName !== undefined;
                if (isController) {
                    return candidate;
                }
            }
        }
        throw new Error('Cannot find controller candidate.');
    };
    /**
     * checks if object is rule.
     */
    ValidationUtilities.IsRule = function (object) {
        if (object.attribute !== undefined) {
            return true;
        }
        return false;
    };
    /**
     * gets property name from expression.
     */
    ValidationUtilities.fromExpression = function (func) {
        var varExtractor = new RegExp('return (.*);');
        var m = varExtractor.exec(func + '');
        if (m && m.length === 2) {
            var parts = m[1].split('.');
            if (parts.length === 2) {
                return parts[1];
            }
        }
        throw new Error('Cannot get property name from expression.');
    };
    return ValidationUtilities;
}());
exports.ValidationUtilities = ValidationUtilities;

//# sourceMappingURL=validationUtilities.js.map
