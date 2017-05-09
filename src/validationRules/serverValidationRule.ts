import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

/**
 * rule for real time server validation.
 */
export class RealTimeServerValidationRule implements IValidationRule {
    /**
     * inits rule
     * 
     * @param validationCall
     * @param message
     */
    constructor(public propertyName: string, private validationCall: (entity: any, value: any) => Promise<boolean>, public message: string) {
    }

    /**
     * action key
     * 
     * @returns {string} 
     */
    public get attribute(): string {
        return 'rtServerError';
    }

    /**
     * validate action
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {
        return this.validationCall(entity, value);
    }
}