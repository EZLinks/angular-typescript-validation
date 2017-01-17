"use strict";
require("angular");
var errorProcessor_1 = require("../utils/errorProcessor");
var validationCore_1 = require("../core/validationCore");
/**
 * base controller class for validation purposes.
 */
var ValidatableController = (function () {
    /**
     * inits controller.
     *
     * @param scope
     * @param validator
     * @param entity
     */
    function ValidatableController(scope, rulesCustomizer) {
        var _this = this;
        this.scope = scope;
        this.rulesCustomizer = rulesCustomizer;
        /**
         * adds the server error to form validation.
         */
        this.addServerError = function (fieldName, errorMesage) {
            _this.scope.$apply(function () {
                errorProcessor_1.ErrorProcessor.addServerFieldError(fieldName, errorMesage, _this.form);
            });
        };
    }
    /**
     * validation call.
     */
    ValidatableController.prototype.validate = function (entity) {
        var _this = this;
        errorProcessor_1.ErrorProcessor.clearAllFormErrors(this.form);
        return validationCore_1.ValidationCore.validateEntity(entity, this.rulesCustomizer, function (rule, result) {
            if (!result) {
                _this.scope.$apply(function () {
                    errorProcessor_1.ErrorProcessor.setFieldError(rule.propertyName, rule.attribute, _this.form);
                });
            }
        });
    };
    Object.defineProperty(ValidatableController.prototype, "form", {
        /**
         * gets the form scope
         *
         * @returns {ng.IFormController}
         */
        get: function () {
            return this.scope[this.formName()];
        },
        enumerable: true,
        configurable: true
    });
    return ValidatableController;
}());
exports.ValidatableController = ValidatableController;

//# sourceMappingURL=validatableController.js.map
