import 'angular';

import { ValidatableController } from '../controllers/validatableController';
import { IMessage } from '../interfaces/message';
import { IValidationRule } from '../interfaces/validationRule';

/**
 * base methods for validation purposes.
 */
export class ValidationUtilities {

    /**
     * tries to find controller in scope
     * 
     * @param scope
     */
    public static getController(scope: ng.IScope): ValidatableController {

        for (var property in scope) {
            if (scope.hasOwnProperty(property)) {

                let candidate: any = scope[property];
                let isController: boolean = candidate && (<ValidatableController> candidate).rulesCustomizer !== undefined
                    && (<ValidatableController> candidate).form !== undefined;

                if (isController) {
                    return candidate;
                }
            }
        }

        throw new Error('Cannot find controller candidate.');
    }

    /**
     * checks if object is rule.
     */
    public static IsRule(object: IMessage): boolean {

        if ((<IValidationRule> object).attribute !== undefined) {
            return true;
        }

        return false;
    }
}