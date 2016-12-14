import { IValidationRule } from './validationRule';

/**
 * interface for rules customizations.
 */
export interface IRulesCustomizer {
    /**
     * dictionaty of rules.
     */
    rulesDictionary: Map<string, IValidationRule[]>;

    /**
     * sequence of rules.
     */
    rules: Array<Array<IValidationRule>>;

    /**
     * gets the sequence rules for property.
     */
    seqRules(key: string): Array<Array<IValidationRule>>;
}