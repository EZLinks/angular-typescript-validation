import { IMessage } from './message';

/**
 * base interface for validation rule.
 */
export interface IValidationRule extends IMessage {

    /**
     * key related to validation action.
     */
    attribute: string;

    /**
     * name of the property.
     */
    propertyName: string;

    /**
     * validate action.
     *
     * @param entity - entity to be validated.
     * @param value - value to be validated.
     * @returns {Promise<boolean>}
     */
    validate(entity: any, value: any): Promise<boolean>;
}
