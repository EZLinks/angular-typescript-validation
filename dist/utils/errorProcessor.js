"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var serverError_1 = require("../models/serverError");
/**
 * global methods for error processing.
 */
var ErrorProcessor = /** @class */ (function () {
    /* istanbul ignore next */ function ErrorProcessor() {
    }
    /**
    * sets/unsets error message
    *
    * @param isError
    * @param fieldName
    * @param ruleAttribute
    */
    ErrorProcessor.setFieldError = function (fieldName, ruleAttribute, form) {
        form.$setValidity(fieldName, false, form);
        if (!form.$error[fieldName]) {
            return;
        }
        if (!form.$error[fieldName][this.validationAttr]) {
            form.$error[fieldName][this.validationAttr] = {};
        }
        form.$error[fieldName][this.validationAttr][ruleAttribute] = true;
    };
    /**
     * adds the server error related to the field.
     */
    ErrorProcessor.addServerFieldError = function (fieldName, errorMessage, form) {
        this.setFieldError(fieldName, this.serverValidationAttr, form);
        if (!form.$error[fieldName][this.serverErrorsAttr]) {
            form.$error[fieldName][this.serverErrorsAttr] = [];
        }
        form.$error[fieldName][this.serverErrorsAttr].push(new serverError_1.ServerError(errorMessage));
    };
    /**
     *  clears all errors for field.
     */
    ErrorProcessor.clearFieldErrors = function (fieldName, form) {
        form.$setValidity(fieldName, true, form);
        if (form.$error && form.$error[fieldName]) {
            form.$error[fieldName][this.validationAttr] = {};
            form.$error[fieldName][this.serverErrorsAttr] = [];
        }
    };
    /**
    * clears all validation errors.
    */
    ErrorProcessor.clearAllFormErrors = function (form) {
        for (var attr in form.$error) {
            if (form.$error.hasOwnProperty(attr)) {
                this.clearFieldErrors(attr, form);
            }
        }
    };
    /**
    * checks if rule has error.
    */
    ErrorProcessor.ruleHasError = function (fieldName, attribute, form) {
        if (!this.checkAttrs(fieldName, form, this.validationAttr)) {
            return false;
        }
        return form.$error[fieldName].length > 0;
    };
    /**
     * returns the server errors for field
     */
    ErrorProcessor.getFieldServerErrors = function (fieldName, form) {
        var result = [];
        if (this.checkAttrs(fieldName, form, this.serverErrorsAttr)) {
            result = form.$error[fieldName][this.serverErrorsAttr];
        }
        return result;
    };
    /**
     * checks if field is valid.
     */
    ErrorProcessor.isFieldValid = function (fieldName, form) {
        var isValid = true;
        if (!form || !form.$error) {
            return true;
        }
        for (var attr in form.$error) {
            if (form.$error.hasOwnProperty(attr) && attr === fieldName) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };
    /**
     * checks attrs for existance.
     */
    ErrorProcessor.checkAttrs = function (fieldName, form, attr) {
        if (!form.$error || !form.$error[fieldName] || !form.$error[fieldName][attr]) {
            return false;
        }
        return true;
    };
    ErrorProcessor.validationAttr = 'validationAttrs';
    ErrorProcessor.serverValidationAttr = 'serverValidation';
    ErrorProcessor.serverErrorsAttr = 'serverErrors';
    return ErrorProcessor;
}());
exports.ErrorProcessor = ErrorProcessor;

//# sourceMappingURL=errorProcessor.js.map
