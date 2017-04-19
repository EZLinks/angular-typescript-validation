"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requiredValidationRule_1 = require("../validationRules/requiredValidationRule");
var serverValidationRule_1 = require("../validationRules/serverValidationRule");
var minLenValidationRule_1 = require("../validationRules/minLenValidationRule");
var maxLenValidationRule_1 = require("../validationRules/maxLenValidationRule");
var validationUtilities_1 = require("../utils/validationUtilities");
/**
 * helps to define validation rules for models.
 */
var RulesCustomizer = (function () {
    /**
     * inits rules customizer.
     *
     * @param rulesMap
     */
    function RulesCustomizer(rulesMap, ruleSequense) {
        if (rulesMap === void 0) { rulesMap = new Map(); }
        if (ruleSequense === void 0) { ruleSequense = new Array(); }
        this.rulesMap = rulesMap;
        this.ruleSequense = ruleSequense;
    }
    /**
     * makes field required.
     *
     * @param keyFunc
     * @param message
     */
    RulesCustomizer.prototype.required = function (func, message) {
        var key = validationUtilities_1.ValidationUtilities.fromExpression(func);
        var rule = new requiredValidationRule_1.RequiredValidationRule(key, message);
        this.addRule(key, rule);
    };
    /**
     * max length valudation rule
     *
     * @param keyFunc
     * @param value
     * @param message
     */
    RulesCustomizer.prototype.maxlen = function (func, value, message) {
        var key = validationUtilities_1.ValidationUtilities.fromExpression(func);
        var rule = new maxLenValidationRule_1.MaxLenValidationRule(key, value, message);
        this.addRule(key, rule);
    };
    /**
     * min length validation rule
     *
     * @param keyFunc
     * @param value
     * @param message
     */
    RulesCustomizer.prototype.minlen = function (func, value, message) {
        var key = validationUtilities_1.ValidationUtilities.fromExpression(func);
        var rule = new minLenValidationRule_1.MinLenValidationRule(key, value, message);
        this.addRule(key, rule);
    };
    /**
     * sets real time validation of the field.
     *
     * @param keyFunc
     * @param validationCall
     * @param message
     */
    RulesCustomizer.prototype.serverValidation = function (func, validationCall, message) {
        var key = validationUtilities_1.ValidationUtilities.fromExpression(func);
        var rule = new serverValidationRule_1.RealTimeServerValidationRule(key, validationCall, message);
        this.addRule(key, rule);
    };
    /**
     * adds validation rule to the dictionary.
     *
     * @param key
     * @param rule
     */
    RulesCustomizer.prototype.addRule = function (key, rule) {
        if (!this.rulesMap[key]) {
            this.rulesMap[key] = [];
        }
        this.rulesMap[key].push(rule);
        var seqlIndex = this.rulesMap[key].length - 1;
        if (!this.ruleSequense[seqlIndex]) {
            this.ruleSequense[seqlIndex] = [];
        }
        this.ruleSequense[seqlIndex].push(rule);
    };
    /**
     * gets the sequence rules for property.
     */
    RulesCustomizer.prototype.seqRules = function (key) {
        var seqRules = new Array();
        var rules = this.rulesMap[key];
        if (rules && rules.length) {
            for (var i = 0; i < this.rules.length; i++) {
                seqRules[i] = [];
                seqRules[i].push(rules[i]);
            }
        }
        return seqRules;
    };
    Object.defineProperty(RulesCustomizer.prototype, "rulesDictionary", {
        /**
         * gets all validation rules.
         *
         * @returns {Map<string, IValidationRule[]>}
         */
        get: function () {
            return this.rulesMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RulesCustomizer.prototype, "rules", {
        /**
         * get rules sequence.
         *
         * @returns {Array<Array<IValidationRule>>}
         */
        get: function () {
            return this.ruleSequense;
        },
        enumerable: true,
        configurable: true
    });
    return RulesCustomizer;
}());
exports.RulesCustomizer = RulesCustomizer;

//# sourceMappingURL=rulesCustomizer.js.map
