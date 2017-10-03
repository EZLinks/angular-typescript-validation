"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
/**
 * base methods for validation purposes.
 */
var ValidationCore = /** @class */ (function () {
    /* istanbul ignore next */ function ValidationCore() {
    }
    /**
     * makes entity validation - client side and real time server side.
     *
     * @param entity
     * @param customizer
     * @param handleRuleResult
     */
    ValidationCore.validateEntity = function (entity, customizer, handleRuleResult) {
        return this.validateRules(entity, customizer.rules, 0, handleRuleResult);
    };
    /**
     * recursively validates rules.
     *
     * @param entity
     * @param seqRules
     * @param sequence
     * @param handleRuleResult
     */
    ValidationCore.validateRules = function (entity, seqRules, sequence, handleRuleResult) {
        var _this = this;
        var promises = [];
        var allValid = true;
        var rules = seqRules[sequence];
        var _loop_1 = function (i) {
            var rule = rules[i];
            if (!rule) {
                return "continue";
            }
            var value = entity[rule.propertyName];
            var promise = rule.validate(entity, value)
                .then(function (result) {
                handleRuleResult(rule, result);
                if (!result) {
                    allValid = false;
                }
                return result;
            });
            promises.push(promise);
        };
        for (var i = 0; i < rules.length; i++) {
            _loop_1(i);
        }
        return Promise.all(promises)
            .then(function () {
            sequence++;
            if (allValid && sequence < seqRules.length) {
                return _this.validateRules(entity, seqRules, sequence, handleRuleResult);
            }
            return allValid;
        });
    };
    return ValidationCore;
}());
exports.ValidationCore = ValidationCore;

//# sourceMappingURL=validationCore.js.map
