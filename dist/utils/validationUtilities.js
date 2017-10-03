"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
/**
 * base methods for validation purposes.
 */
var ValidationUtilities = /** @class */ (function () {
    /* istanbul ignore next */ function ValidationUtilities() {
    }
    /**
     * tries to find controller in scope
     *
     * @param candidate
     */
    ValidationUtilities.getController = function (candidate) {
        var isController = candidate && candidate.rulesCustomizer !== undefined
            && candidate.form !== undefined;
        if (isController) {
            return candidate;
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
        var varExtractor = new RegExp('return ([^;]*)(?=(;|\\}))');
        var m = varExtractor.exec(func + '');
        if (m && m.length >= 2) {
            var parts = m[1].split('.');
            if (parts.length === 2) {
                var fieldName = parts[1];
                return fieldName.replace(' ', '');
            }
        }
        throw new Error('Cannot get property name from expression.');
    };
    return ValidationUtilities;
}());
exports.ValidationUtilities = ValidationUtilities;

//# sourceMappingURL=validationUtilities.js.map
