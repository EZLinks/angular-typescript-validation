"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var initValidationModuleProvider_1 = require("../../init/initValidationModuleProvider");
var validationUtilities_1 = require("../../utils/validationUtilities");
var errorProcessor_1 = require("../../utils/errorProcessor");
var validationCore_1 = require("../../core/validationCore");
/**
 * directive for validation purposes.
 * inits watch on the model and validates changes in the model automatically.
 */
var ValidatableFieldDirective = /** @class */ (function () {
    function ValidatableFieldDirective() {
        this.restrict = 'A';
        this.require = 'ngModel';
        this.scope = { validatableField: '=' };
    }
    /**
     * creates a new instance of directive
     */
    ValidatableFieldDirective.factory = function () {
        return new ValidatableFieldDirective();
    };
    /**
     * link for directive.
     *
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    ValidatableFieldDirective.prototype.link = function (scope, element, attrs) {
        var worker = new DirectiveWorker();
        var basicController = validationUtilities_1.ValidationUtilities.getController(scope.validatableField);
        if (worker.initFields(scope, element, attrs, basicController)) {
            worker.watchModel(scope);
            worker.watchError(scope);
        }
    };
    return ValidatableFieldDirective;
}());
exports.ValidatableFieldDirective = ValidatableFieldDirective;
/**
 * class for processing directive tasks.
 */
var DirectiveWorker = /** @class */ (function () {
    function DirectiveWorker() {
        this.timer = null;
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
        this.fieldName = attrs['name'];
        this.form = ctrl.form;
        this.seqRules = ctrl.rulesCustomizer.seqRules(this.fieldName);
        this.item = ctrl.item;
        if (this.seqRules && this.seqRules.length) {
            return true;
        }
        return false;
    };
    /**
     * makes a watch on the model value.
     *
     * @param scope - scope
     * @param attr - element attributes
     */
    DirectiveWorker.prototype.watchModel = function (scope) {
        var _this = this;
        scope.$watch("validatableField.model." + this.fieldName, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                errorProcessor_1.ErrorProcessor.clearFieldErrors(_this.fieldName, _this.form);
                if (_this.timer) {
                    clearTimeout(_this.timer);
                }
                _this.timer = setTimeout(function () {
                    validationCore_1.ValidationCore.validateRules(_this.item, _this.seqRules, 0, function (rule, result) {
                        if (!result) {
                            scope.$apply(function () {
                                errorProcessor_1.ErrorProcessor.setFieldError(_this.fieldName, rule.attribute, _this.form);
                            });
                        }
                    });
                }, initValidationModuleProvider_1.InitValidationModuleProvider.config.validationTimoutMs);
            }
        });
    };
    /**
     * makes watch to apply error to field if needed.
     *
     * @param scope
     */
    DirectiveWorker.prototype.watchError = function (scope) {
        var _this = this;
        scope.$watch("validatableField.form.$error." + this.fieldName, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                var isFieldValid = errorProcessor_1.ErrorProcessor.isFieldValid(_this.fieldName, _this.form);
                initValidationModuleProvider_1.InitValidationModuleProvider.config.fieldErrorHandler(!isFieldValid, _this.element, _this.fieldName);
            }
        });
    };
    return DirectiveWorker;
}());

//# sourceMappingURL=validatableField.js.map
