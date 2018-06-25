"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var initValidationModuleProvider_1 = require("../../init/initValidationModuleProvider");
var validationUtilities_1 = require("../../utils/validationUtilities");
var errorProcessor_1 = require("../../utils/errorProcessor");
/**
 * directive for validation mesages display.
 */
var ValidationSummaryDirective = /** @class */ (function () {
    /**
     * inits directive
     */
    function ValidationSummaryDirective() {
        this.restrict = 'E';
        this.scope = { ctrl: '=' };
        this.controller = ValidationSummaryController;
        this.controllerAs = 'vs';
        this.template = initValidationModuleProvider_1.InitValidationModuleProvider.config.summaryTemplateHtml;
    }
    /**
     * creates a new instance of directive
     */
    ValidationSummaryDirective.factory = function () {
        return new ValidationSummaryDirective();
    };
    /**
     * link for directive.
     *
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    ValidationSummaryDirective.prototype.link = function (scope, element, attrs, ctrl) {
        var basicController = validationUtilities_1.ValidationUtilities.getController(scope.ctrl);
        ctrl.initFields(scope, element, attrs, basicController);
    };
    return ValidationSummaryDirective;
}());
exports.ValidationSummaryDirective = ValidationSummaryDirective;
/**
 * controller class
 */
var ValidationSummaryController = /** @class */ (function () {
    function ValidationSummaryController() {
        var _this = this;
        /**
         * checks if error could be shown.
         */
        this.showError = function (error) {
            if (validationUtilities_1.ValidationUtilities.IsRule(error)) {
                var rule = error;
                return errorProcessor_1.ErrorProcessor.ruleHasError(rule.propertyName, rule.attribute, _this.form);
            }
            return true;
        };
        /**
         * Checks if form has errors.
         */
        this.hasErrors = function () {
            return _this.form.$valid === false;
        };
    }
    /**
     * inits the main fields needed to proper work of the directive.
     *
     * @param scope - scope
     * @param element - input element
     * @param attrs - element attributes.
     * @param ctrl - controller.
     * @returns {boolean}
     */
    ValidationSummaryController.prototype.initFields = function (scope, element, attrs, ctrl) {
        this.form = ctrl.form;
        this.rules = ctrl.rulesCustomizer.rulesDictionary;
    };
    Object.defineProperty(ValidationSummaryController.prototype, "errors", {
        /**
         * gets the errors for this field.
         */
        get: function () {
            var ruleMessagesNonDuplicated = [];
            var ruleMessages = [];
            var messageStrings = {};
            for (var rule in this.rules) {
                if (this.rules.hasOwnProperty(rule)) {
                    var serverErrors = errorProcessor_1.ErrorProcessor.getFieldServerErrors(rule, this.form);
                    ruleMessages = ruleMessages.concat(this.rules[rule]);
                    ruleMessages = ruleMessages.concat(serverErrors);
                }
            }
            for (var i = 0; i < ruleMessages.length; i++) {
                var currentMessage = ruleMessages[i];
                if (!messageStrings[currentMessage.message]) {
                    ruleMessagesNonDuplicated.push(currentMessage);
                    messageStrings[currentMessage.message] = true;
                }
            }
            return ruleMessagesNonDuplicated;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationSummaryController;
}());
exports.ValidationSummaryController = ValidationSummaryController;

//# sourceMappingURL=validationSummary.js.map
