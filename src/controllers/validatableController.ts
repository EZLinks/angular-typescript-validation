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
     * rulez of controller.
     */
    rulesCustomizer: IRulesCustomizer;
}