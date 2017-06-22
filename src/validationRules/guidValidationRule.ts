import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

/**
 * rule for required.
 */
export class GuidValidationRule implements IValidationRule {
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
        return 'guid';
    }

    /**
     * validate action.
     *
     * @param value
     */
    public validate(entity: any, value: any): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve) => {

            let isValueDefined = !!value;
            let isValueNotEmptyGuid = value !== '00000000-0000-0000-0000-000000000000';

            // https://stackoverflow.com/a/7905992
            let regex = /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F‌​]{4}-[0-9a-fA-F]{12}‌​\}?$/;
            let isValidGuid = value.match(regex);

            resolve(isValueDefined && isValueNotEmptyGuid && isValidGuid);
        });

        return promise;
    }
}
