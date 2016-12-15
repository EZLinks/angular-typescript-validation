import {Promise} from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

/**
 * rule for required.
 */
export class RequiredValidationRule implements IValidationRule {
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
        return 'required';
    }

    /**
     * validate action.
     * 
     * @param value
     */
    public validate(value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {

            let notDefined: boolean = false;
            if (value === null || value === undefined || value === '') {
                notDefined = true;
            }

            resolve(!notDefined);
        });

        return promise;
    }
}