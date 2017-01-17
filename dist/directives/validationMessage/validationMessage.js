"use strict";
require("angular");
var initValidationModuleProvider_1 = require("../../init/initValidationModuleProvider");
var validationUtilities_1 = require("../../utils/validationUtilities");
var errorProcessor_1 = require("../../utils/errorProcessor");
/**
 * controller class
 */
var ValidationMessageController = (function () {
    function ValidationMessageController($scope) {
        this.$scope = $scope;
    }
    return ValidationMessageController;
}());
ValidationMessageController.$inject = ['$scope'];
exports.ValidationMessageController = ValidationMessageController;
/**
 * directive for validation mesages display.
 */
var ValidationMessageDirective = (function () {
    /**
     * inits directive
     */
    function ValidationMessageDirective() {
        this.restrict = 'E';
        this.scope = {};
        this.controller = ValidationMessageController;
        this.controllerAs = 'vm';
        this.replace = true;
        this.template = initValidationModuleProvider_1.InitValidationModuleProvider.config.templateHtml;
    }
    /**
     * creates a new instance of directive
     */
    ValidationMessageDirective.factory = function () {
        return new ValidationMessageDirective();
    };
    /**
     * link for directive.
     *
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    ValidationMessageDirective.prototype.link = function (scope, element, attrs) {
        var worker = new DirectiveWorker();
        var basicController = validationUtilities_1.ValidationUtilities.getController(scope.$parent);
        worker.initFields(scope, element, attrs, basicController);
        worker.watchError(scope);
    };
    return ValidationMessageDirective;
}());
exports.ValidationMessageDirective = ValidationMessageDirective;
var DirectiveWorker = (function () {
    function DirectiveWorker() {
        var _this = this;
        this.controllerAs = 'vm';
        /**
         * checks if error could be shown.
         */
        this.showError = function (error) {
            if (validationUtilities_1.ValidationUtilities.IsRule(error)) {
                var rule = error;
                return errorProcessor_1.ErrorProcessor.ruleHasError(_this.fieldName, rule.attribute, _this.form);
            }
            return true;
        };
        /**
         * gets the errors for this field.
         */
        this.errors = function () {
            var rulesMessage = _this.rules;
            var serverErrors = errorProcessor_1.ErrorProcessor.getFieldServerErrors(_this.fieldName, _this.form);
            return rulesMessage.concat(serverErrors);
        };
        /**
         * checks if field is valid.
         */
        this.isFieldValid = function () {
            return errorProcessor_1.ErrorProcessor.isFieldValid(_this.fieldName, _this.form);
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
    DirectiveWorker.prototype.initFields = function (scope, element, attrs, ctrl) {
        this.element = element;
        this.fieldName = attrs['for'];
        this.form = ctrl.form;
        this.formName = ctrl.formName();
        this.rules = ctrl.rulesCustomizer.rulesDictionary[this.fieldName];
        if (!this.rules) {
            this.rules = [];
        }
        scope[this.controllerAs].isFieldValid = this.isFieldValid;
        scope[this.controllerAs].errors = this.errors;
        scope[this.controllerAs].showError = this.showError;
        if (!this.fieldName) {
            throw new Error('Empty field name.');
        }
    };
    /**
     * makes watch to apply error to field if needed.
     *
     * @param scope
     */
    DirectiveWorker.prototype.watchError = function (scope) {
        var _this = this;
        scope.$parent.$watch(this.formName + ".$error." + this.fieldName, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                initValidationModuleProvider_1.InitValidationModuleProvider.config.fieldErrorHandler(!_this.isFieldValid(), _this.element, _this.fieldName);
            }
        }, true);
    };
    return DirectiveWorker;
}());

//# sourceMappingURL=validationMessage.js.map
