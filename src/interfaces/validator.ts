import { IRulesCustomizer } from './rulesCustomizer';

/**
 * base interface for container that stores validation rules.
 */
export interface IValidator {
    /**
     * returns rules customizer object.
     */
    rulesCustomizer: IRulesCustomizer;
}