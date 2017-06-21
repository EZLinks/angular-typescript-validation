import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

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
            // http://emailregex.com/
            let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            resolve(value.match(regex));
        });

        return promise;
    }
}
