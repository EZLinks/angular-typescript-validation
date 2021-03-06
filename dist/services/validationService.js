"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var errorProcessor_1 = require("../utils/errorProcessor");
var validationCore_1 = require("../core/validationCore");
/**
 * base service class for validation purposes.
 */
var ValidationService = /** @class */ (function () {
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
                errorProcessor_1.ErrorProcessor.addServerFieldError(fieldName, errorMesage, _this.controller.form);
            });
        };
    }
    /**
     * validation call.
     */
    ValidationService.prototype.validate = function (entity) {
        var _this = this;
        errorProcessor_1.ErrorProcessor.clearAllFormErrors(this.controller.form);
        return validationCore_1.ValidationCore.validateEntity(entity, this.controller.rulesCustomizer, function (rule, result) {
            if (!result) {
                _this.scope.$apply(function () {
                    errorProcessor_1.ErrorProcessor.setFieldError(rule.propertyName, rule.attribute, _this.controller.form);
                });
            }
        });
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;

//# sourceMappingURL=validationService.js.map
