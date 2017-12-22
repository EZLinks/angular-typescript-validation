import 'angular';

import { IValidationRule } from '../../interfaces/validationRule';
import { IValidatableController } from '../../controllers/validatableController';
import { InitValidationModuleProvider } from '../../init/initValidationModuleProvider';
import { ValidationUtilities } from '../../utils/validationUtilities';
import { ErrorProcessor } from '../../utils/errorProcessor';
import { IMessage } from '../../interfaces/message';

/**
 * directive for validation mesages display.
 */
export class ValidationSummaryDirective implements ng.IDirective {

    public restrict: string = 'E';
    public scope: any = { ctrl: '=' };
    public controller: any = ValidationSummaryController;
    public controllerAs: string = 'vs';
    public template: string;

    /**
     * creates a new instance of directive
     */
    public static factory(): ValidationSummaryDirective {
        return new ValidationSummaryDirective();
    }

    /**
     * inits directive
     */
    constructor() {
        this.template = InitValidationModuleProvider.config.summaryTemplateHtml;
    }

    /**
     * link for directive.
     * 
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    public link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ValidationSummaryController): void {

        let basicController: IValidatableController = ValidationUtilities.getController(scope.ctrl);
        ctrl.initFields(scope, element, attrs, basicController);
    }
}

/**
 * controller class
 */
export class ValidationSummaryController {

    private form: ng.IFormController;
    private rules: Map<string, IValidationRule[]>;

    /**
     * inits the main fields needed to proper work of the directive.
     * 
     * @param scope - scope
     * @param element - input element
     * @param attrs - element attributes.
     * @param ctrl - controller.
     * @returns {boolean}
     */
    public initFields(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IValidatableController): void {

        this.form = ctrl.form;
        this.rules = ctrl.rulesCustomizer.rulesDictionary;
    }

    /**
     * checks if error could be shown.
     */
    public showError = (error: IMessage): boolean => {

        if (ValidationUtilities.IsRule(error)) {
            let rule: IValidationRule = <IValidationRule>error;
            return ErrorProcessor.ruleHasError(rule.propertyName, rule.attribute, this.form);
        }

        return true;
    }

    /**
     * gets the errors for this field.
     */
    public get errors(): IMessage[] {

        let ruleMessagesNonDuplicated: IMessage[] = [];
        let ruleMessages: IMessage[] = [];
        let messageStrings: object = {};

        for (let rule in this.rules) {

            if (this.rules.hasOwnProperty(rule)) {

                let serverErrors: IMessage[] = ErrorProcessor.getFieldServerErrors(rule, this.form);

                ruleMessages = ruleMessages.concat(this.rules[rule]);
                ruleMessages = ruleMessages.concat(serverErrors as any);
            }
        }
        
        for (let i = 0; i < ruleMessages.length; i++) { 
            
            let currentMessage = ruleMessages[i];

            if (!messageStrings[currentMessage.message]) {
                ruleMessagesNonDuplicated.push(currentMessage);
                messageStrings[currentMessage.message] = true;
            }
        }

        return ruleMessagesNonDuplicated;
    }

    /**
     * Checks if form has errors.
     */
    public hasErrors = () => {
        return this.form.$valid === false;
    }
}