import { Promise } from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';

import { isUUID } from 'validator/lib/isUUID';

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

            let isValidGuid = isUUID(value);

            resolve(isValueDefined && isValueNotEmptyGuid && isValidGuid);
        });

        return promise;
    }
}
