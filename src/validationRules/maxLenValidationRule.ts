import { IValidationRule } from '../interfaces/validationRule';

/**
 * validation rule for max length.
 */
export class MaxLenValidationRule implements IValidationRule {

    /**
     * inits rule
     * @param data
     * @param message
     */
    constructor(public propertyName: string, private data: number, public message: string) {
    }

    /**
     * action key.
     *
     * @returns {string}
     */
    public get attribute(): string {
        return 'maxlen';
    }

    /**
     * validate action.
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {
            if (value === null || value === undefined) {
                resolve(true);
            }
            resolve(value.length <= this.data);
        });

        return promise;
    }
}
