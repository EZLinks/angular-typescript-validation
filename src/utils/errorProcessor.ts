import 'angular';

import { ServerError } from '../models/serverError';

/**
 * global methods for error processing.
 */
export class ErrorProcessor {

    private static validationAttr: string = 'validationAttrs';
    private static serverValidationAttr: string = 'serverValidation';
    private static serverErrorsAttr: string = 'serverErrors';

    /**
    * sets/unsets error message
    * 
    * @param isError
    * @param fieldName
    * @param ruleAttribute
    */
    public static setFieldError(fieldName: string, ruleAttribute: string, form: ng.IFormController): void {

        form.$setValidity(fieldName, false, form);

        if (!form.$error[fieldName]) {
            return;
        }

        if (!form.$error[fieldName][this.validationAttr]) {
            form.$error[fieldName][this.validationAttr] = {};
        }

        form.$error[fieldName][this.validationAttr][ruleAttribute] = true;
    }

    /**
     * adds the server error related to the field.
     */
    public static addServerFieldError(fieldName: string, errorMessage: string, form: ng.IFormController): void {

        this.setFieldError(fieldName, this.serverValidationAttr, form);

        if (!form.$error[fieldName][this.serverErrorsAttr]) {
            form.$error[fieldName][this.serverErrorsAttr] = [];
        }

        form.$error[fieldName][this.serverErrorsAttr].push(new ServerError(errorMessage));
    }

    /**
     *  clears all errors for field.
     */
    public static clearFieldErrors(fieldName: string, form: ng.IFormController): void {

        form.$setValidity(fieldName, true, form);

        if (form.$error && form.$error[fieldName]) {
            form.$error[fieldName][this.validationAttr] = {};
            form.$error[fieldName][this.serverErrorsAttr] = [];
        }
    }

    /**
    * clears all validation errors.
    */
    public static clearAllFormErrors(form: ng.IFormController): void {

        for (var attr in form.$error) {
            if (form.$error.hasOwnProperty(attr)) {

                this.clearFieldErrors(attr, form);
            }
        }
    }

    /**
    * checks if rule has error.
    */
    public static ruleHasError(fieldName: string, attribute: string, form: ng.IFormController): boolean {

        if (!this.checkAttrs(fieldName, form, this.validationAttr)) {
            return false;
        }

        return form.$error[fieldName].validationAttrs[attribute] === true;
    }

    /**
     * returns the server errors for field
     */
    public static getFieldServerErrors(fieldName: string, form: ng.IFormController): ServerError[] {

        let result: ServerError[] = [];

        if (this.checkAttrs(fieldName, form, this.serverErrorsAttr)) {
            result = form.$error[fieldName][this.serverErrorsAttr];
        }

        return result;
    }

    /**
     * checks if field is valid.
     */
    public static isFieldValid(fieldName: string, form: ng.IFormController): boolean {

        let isValid: boolean = true;

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
    }

    /**
     * checks attrs for existance.
     */
    public static checkAttrs(fieldName: string, form: ng.IFormController, attr: string): boolean {

        if (!form.$error || !form.$error[fieldName] || !form.$error[fieldName][attr]) {
            return false;
        }

        return true;
    }
}