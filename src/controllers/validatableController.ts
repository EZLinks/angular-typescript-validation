import 'angular';

import { IRulesCustomizer } from '../interfaces/rulesCustomizer';

/**
 * base controller interface for validation purposes.
 */
export interface IValidatableController {
    
    /**
     * gets the form scope
     * 
     * @returns {ng.IFormController}
     */
    form: ng.IFormController;

    /**
     * validation form name.
     */
    formName: string;

    /**
     * rulez of controller.
     */
    rulesCustomizer: IRulesCustomizer;
}