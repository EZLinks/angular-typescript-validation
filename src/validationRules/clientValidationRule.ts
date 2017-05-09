import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

/**
 * rule for client custom validation.
 */
export class ClientValidationRule implements IValidationRule {

    /**
     * inits rule
     * 
     * @param validationCall
     * @param message
     */
    constructor(public propertyName: string, private validationCall: (entity: any, value: any) => boolean, public message: string) {
    }

    /**
     * action key
     * 
     * @returns {string} 
     */
    public get attribute(): string {
        return 'clientCustom';
    }

    /**
     * validate action
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {

        let promise: Promise<boolean> = new Promise((resolve) => {

            let result = this.validationCall(entity, value);
            resolve(result);
        });

        return promise;
    }
}