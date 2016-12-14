import 'angular';

import { IValidationRule } from '../interfaces/validationRule';
import { IRulesCustomizer } from '../interfaces/rulesCustomizer';

/**
 * base methods for validation purposes.
 */
export class ValidationCore {

    /**
     * makes entity validation - client side and real time server side.
     * 
     * @param entity
     * @param customizer
     * @param handleRuleResult
     */
    public static validateEntity(
        entity: Object,
        customizer: IRulesCustomizer,
        handleRuleResult: (rule: IValidationRule, result: boolean) => void): Promise<boolean> {
        return this.validateRules(entity, customizer.rules, 0, handleRuleResult);
    }

    /**
     * recursively validates rules.
     * 
     * @param entity
     * @param seqRules
     * @param sequence
     * @param handleRuleResult
     */
    public static validateRules(
        entity: Object,
        seqRules: Array<Array<IValidationRule>>,
        sequence: number,
        handleRuleResult: (rule: IValidationRule, result: boolean) => void
    ): Promise<boolean> {

        const promises: Promise<boolean>[] = [];
        let allValid: boolean = true;
        let rules: IValidationRule[] = seqRules[sequence];

        for (let i: number = 0; i < rules.length; i++) {

            let rule: IValidationRule = rules[i];
            let value: any = entity[rule.propertyName];

            let promise: Promise<boolean> = rule.validate(value)
                .then(result => {

                    handleRuleResult(rule, result);

                    if (!result) {
                        allValid = false;
                    }

                    return result;
                });

            promises.push(promise);
        }

        return Promise.all(promises)
            .then(() => {

               sequence++;

                if (allValid && sequence < seqRules.length) {
                    return this.validateRules(entity, seqRules, sequence, handleRuleResult);
                }

                return allValid;
            });
    }
}