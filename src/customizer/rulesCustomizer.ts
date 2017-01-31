import {Promise} from 'es6-promise';
import { IValidationRule } from '../interfaces/validationRule';
import { RequiredValidationRule } from '../validationRules/requiredValidationRule';
import { RealTimeServerValidationRule } from '../validationRules/serverValidationRule';
import { MinLenValidationRule } from '../validationRules/minLenValidationRule';
import { MaxLenValidationRule } from '../validationRules/maxLenValidationRule';
import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
import { ValidationUtilities } from '../utils/validationUtilities';

/**
 * helps to define validation rules for models.
 */
export class RulesCustomizer<T extends Object> implements IRulesCustomizer {

    /**
     * inits rules customizer.
     * 
     * @param rulesMap
     */
    constructor(
        private rulesMap: Map<string, IValidationRule[]> = new Map<string, IValidationRule[]>(),
        private ruleSequense: Array<Array<IValidationRule>> = new Array<Array<IValidationRule>>()) {
    }

    /**
     * makes field required.
     * 
     * @param keyFunc
     * @param message
     */
    public required(func: (obj: T) => void, message: string): void {
        let key: string = ValidationUtilities.fromExpression<T>(func);
        let rule: IValidationRule = new RequiredValidationRule(key, message);
        this.addRule(key, rule);
    }

    /**
     * max length valudation rule
     * 
     * @param keyFunc
     * @param value
     * @param message
     */
    public maxlen(func: (obj: T) => void, value: number, message: string): void {
        let key: string = ValidationUtilities.fromExpression<T>(func);
        let rule: IValidationRule = new MaxLenValidationRule(key, value, message);
        this.addRule(key, rule);
    }

    /**
     * min length validation rule
     * 
     * @param keyFunc
     * @param value
     * @param message
     */
    public minlen(func: (obj: T) => void, value: number, message: string): void {
        let key: string = ValidationUtilities.fromExpression<T>(func);
        let rule: IValidationRule = new MinLenValidationRule(key, value, message);
        this.addRule(key, rule);
    }

    /**
     * sets real time validation of the field.
     * 
     * @param keyFunc
     * @param validationCall
     * @param message
     */
    public serverValidation(func: (obj: T) => void, validationCall: (value: any) => Promise<boolean>, message: string): void {
        let key: string = ValidationUtilities.fromExpression<T>(func);
        let rule: IValidationRule = new RealTimeServerValidationRule(key, validationCall, message);
        this.addRule(key, rule);
    }

    /**
     * adds validation rule to the dictionary.
     * 
     * @param key
     * @param rule
     */
    protected addRule(key: string, rule: IValidationRule): void {

        if (!this.rulesMap[key]) {
            this.rulesMap[key] = [];
        }

        this.rulesMap[key].push(rule);

        let seqlIndex: number = this.rulesMap[key].length - 1;

        if (!this.ruleSequense[seqlIndex]) {
            this.ruleSequense[seqlIndex] = [];
        }

        this.ruleSequense[seqlIndex].push(rule);
    }

    /**
     * gets the sequence rules for property.
     */
    public seqRules(key: string): Array<Array<IValidationRule>> {

        let seqRules: Array<Array<IValidationRule>> = new Array<Array<IValidationRule>>();

        let rules: IValidationRule[] = this.rulesMap[key];
        if (rules && rules.length) {
            for (let i: number = 0; i < this.rules.length; i++) {
                seqRules[i] = [];
                seqRules[i].push(rules[i]);
            }
        }

        return seqRules;
    }

    /**
     * gets all validation rules.
     * 
     * @returns {Map<string, IValidationRule[]>}
     */
    public get rulesDictionary(): Map<string, IValidationRule[]> {
        return this.rulesMap;
    }

    /**
     * get rules sequence.
     * 
     * @returns {Array<Array<IValidationRule>>}
     */
    public get rules(): Array<Array<IValidationRule>> {
        return this.ruleSequense;
    }
}