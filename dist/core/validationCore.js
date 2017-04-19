"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var es6_promise_1 = require("es6-promise");
/**
 * base methods for validation purposes.
 */
var ValidationCore = (function () {
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
            var value = entity[rule.propertyName];
            var promise = rule.validate(value)
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
        return es6_promise_1.Promise.all(promises)
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
