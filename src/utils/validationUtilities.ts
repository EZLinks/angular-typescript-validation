import 'angular';

import { IValidatableController } from '../controllers/validatableController';
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
    public static getController(scope: ng.IScope): IValidatableController {

        for (var property in scope) {
            if (scope.hasOwnProperty(property)) {

                let candidate: any = scope[property];
                let isController: boolean = candidate && (<IValidatableController> candidate).rulesCustomizer !== undefined
                    && (<IValidatableController> candidate).formName !== undefined;

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

    /**
     * gets property name from expression.
     */
    public static fromExpression<T>(func: (obj: T) => void): string {

        let varExtractor: RegExp = new RegExp('return ([^;]*)(?=(;|\\}))');
        let m: RegExpExecArray = varExtractor.exec(func + '');

        if (m && m.length >= 2) {
            let parts: Array<string> = m[1].split('.');
            if (parts.length === 2) {
                let fieldName = parts[1];
				return fieldName.replace(' ', '');
            }
        }

        throw new Error('Cannot get property name from expression.');
    }
}