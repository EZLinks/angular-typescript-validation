import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

import { isEmail } from 'validator/lib/isEmail';

/**
 * rule for required.
 */
export class EmailValidationRule implements IValidationRule {
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
        return 'email';
    }

    /**
     * validate action.
     *
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {
            resolve(isEmail(value));
        });

        return promise;
    }
}
