import 'angular';

import { IRulesCustomizer } from '../interfaces/rulesCustomizer';

/**
 * base controller interface for validation purposes.
 */
export interface IValidatableController {

    /**
     * validation form.
     */
    form: any;
    
    /**
     * the item to validate.
     */
    item: any;

    /**
     * rulez of controller.
     */
    rulesCustomizer: IRulesCustomizer;
}