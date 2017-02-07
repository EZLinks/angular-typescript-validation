"use strict";
require("angular");
var errorProcessor_1 = require("../utils/errorProcessor");
var validationCore_1 = require("../core/validationCore");
/**
 * base service class for validation purposes.
 */
var ValidationService = (function () {
    /**
     * inits controller.
     *
     * @param controller
     * @param scope
     * @param validator
     * @param entity
     */
    function ValidationService(controller, scope) {
        var _this = this;
        this.controller = controller;
        this.scope = scope;
        /**
         * adds the server error to form validation.
         */
        this.addServerError = function (fieldName, errorMesage) {
            _this.scope.$apply(function () {
                errorProcessor_1.ErrorProcessor.addServerFieldError(fieldName, errorMesage, _this.form);
            });
        };
    }
    Object.defineProperty(ValidationService.prototype, "form", {
        /**
         * gets the controllers form object.
         */
        get: function () {
            return this.scope[this.controller.formName];
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * validation call.
     */
    ValidationService.prototype.validate = function (entity) {
        var _this = this;
        errorProcessor_1.ErrorProcessor.clearAllFormErrors(this.form);
        return validationCore_1.ValidationCore.validateEntity(entity, this.controller.rulesCustomizer, function (rule, result) {
            if (!result) {
                _this.scope.$apply(function () {
                    errorProcessor_1.ErrorProcessor.setFieldError(rule.propertyName, rule.attribute, _this.form);
                });
            }
        });
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;

//# sourceMappingURL=validationService.js.map
