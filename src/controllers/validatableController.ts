import 'angular';
import {Promise} from 'es6-promise';

import { ErrorProcessor } from '../utils/errorProcessor';
import { IValidationRule } from '../interfaces/validationRule';
import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
import { ValidationCore } from '../core/validationCore';

/**
 * base controller class for validation purposes.
 */
export abstract class ValidatableController {

    /**
     * inits controller.
     * 
     * @param scope
     * @param validator
     * @param entity
     */
    constructor(protected scope: ng.IScope, public rulesCustomizer: IRulesCustomizer) {
    }

    /**
     * validation call.
     */
    protected validate(entity: Object): Promise<boolean> {

        ErrorProcessor.clearAllFormErrors(this.form);

        return ValidationCore.validateEntity(entity,
            this.rulesCustomizer,
            (rule: IValidationRule, result: boolean) => {

                if (!result) {
                    this.scope.$apply(() => {
                        ErrorProcessor.setFieldError(rule.propertyName, rule.attribute, this.form);
                    });
                }
            });
    }

    /**
     * adds the server error to form validation.
     */
    protected addServerError = (fieldName: string, errorMesage: string) => {

        this.scope.$apply(() => {
            ErrorProcessor.addServerFieldError(fieldName, errorMesage, this.form);
        });
    }

    /**
     * gets the form scope
     * 
     * @returns {ng.IFormController}
     */
    public get form(): ng.IFormController {
        return this.scope[this.formName()];
    }

    /**
     * validation form name.
     */
    public abstract formName(): string;
}