import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

import { isMobilePhone } from 'validator/lib/isMobilePhone';

/**
 * rule for required.
 */
export class PhoneValidationRule implements IValidationRule {
    /**
     * init rule
     *
     * @param message
     */
    constructor(public propertyName: string, public message: string) {
    }

    /**
     * action key.
     *
     * @returns {string}
     */
    public get attribute(): string {
        return 'phone';
    }

    /**
     * validate action.
     *
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {
            resolve(isMobilePhone(value));
        });

        return promise;
    }
}
