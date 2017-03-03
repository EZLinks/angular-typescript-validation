import 'angular';
import {Promise} from 'es6-promise';

import { ErrorProcessor } from '../utils/errorProcessor';
import { IValidationRule } from '../interfaces/validationRule';
import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
import { ValidationCore } from '../core/validationCore';
import { IValidatableController } from '../controllers/validatableController';

/**
 * service interface for validation.
 */
export interface IValidationService {
    
    /**
     * validation call.
     */
    validate(entity: Object): Promise<boolean>;

    /**
     * adds the server error to form validation.
     */
    addServerError(fieldName: string, errorMesage: string): void;
}

/**
 * base service class for validation purposes.
 */
export class ValidationService implements IValidationService {

    /**
     * inits controller.
     * 
     * @param controller
     * @param scope
     * @param validator
     * @param entity
     */
    constructor(
        protected controller: IValidatableController, 
        protected scope: ng.IScope) 
    {
    }

    /**
     * validation call.
     */
    public validate(entity: Object): Promise<boolean> {

        ErrorProcessor.clearAllFormErrors(this.controller.form);

        return ValidationCore.validateEntity(entity,
            this.controller.rulesCustomizer,
            (rule: IValidationRule, result: boolean) => {

                if (!result) {
                    this.scope.$apply(() => {
                        ErrorProcessor.setFieldError(rule.propertyName, rule.attribute, this.controller.form);
                    });
                }
            });
    }

    /**
     * adds the server error to form validation.
     */
    public addServerError = (fieldName: string, errorMesage: string) => {

        this.scope.$apply(() => {
            ErrorProcessor.addServerFieldError(fieldName, errorMesage, this.controller.form);
        });
    }
}