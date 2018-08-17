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
     * @param candidate
     */
    public static getController(candidate: any): IValidatableController {

        let isController: boolean = candidate && (<IValidatableController> candidate).rulesCustomizer !== undefined
                    && (<IValidatableController> candidate).form !== undefined;

                if (isController) {
                    return candidate;
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
            parts.shift();
            
            let fieldName = parts.join('.');
            return fieldName.replace(' ', '');            
        }

        throw new Error('Cannot get property name from expression.');
    }
}