import 'angular';

import { IRulesCustomizer } from '../interfaces/rulesCustomizer';

/**
 * base controller interface for validation purposes.
 */
export interface IValidatableController {

    /**
     * validation form name.
     */
    formName: string;

    /**
     * rulez of controller.
     */
    rulesCustomizer: IRulesCustomizer;
}