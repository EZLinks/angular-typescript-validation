import { IValidationRule } from '../interfaces/validationRule';

/**
 * rule for min lenght.
 */
export class MinLenValidationRule implements IValidationRule {

    /**
     * inits rule.
     * 
     * @param data
     * @param message
     */
    constructor(public propertyName: string, private data: number, public message: string) {
    }

    /**
     * action key
     * 
     * @returns {string} 
     */
    public get attribute(): string {
        return 'minlen';
    }

    /**
     * validation action
     * 
     * @param value
     */
    public validate(value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {

            resolve(value.length >= this.data);
        });

        return promise;
    }
}