﻿import 'angular';

import { IValidationRule } from '../../interfaces/validationRule';
import { IValidatableController } from '../../controllers/validatableController';
import { InitValidationModuleProvider } from '../../init/initValidationModuleProvider';
import { ValidationUtilities } from '../../utils/validationUtilities';
import { ErrorProcessor } from '../../utils/errorProcessor';
import { IMessage } from '../../interfaces/message';

/**
 * interface for scope
 */
export interface IValidationMessageScope extends ng.IScope {
    rules: IValidationRule[];
}

/**
 * controller class
 */
export class ValidationMessageController {

    public static $inject: string[] = ['$scope'];
    constructor(public $scope: IValidationMessageScope) {
    }
}

/**
 * directive for validation mesages display.
 */
export class ValidationMessageDirective implements ng.IDirective {

    public restrict: string = 'E';
    public scope: any = { ctrl: '=' };
    public controller: any = ValidationMessageController;
    public controllerAs: string = 'vm';
    public replace: boolean = true;
    public template: string;

    /**
     * creates a new instance of directive
     */
    public static factory(): ValidationMessageDirective {
        return new ValidationMessageDirective();
    }

    /**
     * inits directive
     */
    constructor() {
        this.template = InitValidationModuleProvider.config.templateHtml;
    }

    /**
     * link for directive.
     * 
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    public link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {

        let worker: DirectiveWorker = new DirectiveWorker();
        let basicController: IValidatableController = ValidationUtilities.getController(scope.ctrl);
        worker.initFields(scope, element, attrs, basicController);
    }
}

class DirectiveWorker {

    private fieldName: string;
    private element: any;
    private form: ng.IFormController;
    private rules: IValidationRule[];
    private controllerAs: string = 'vm';

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

        this.element = element;
        this.fieldName = attrs['for'];
        this.form = ctrl.form;
        this.rules = ctrl.rulesCustomizer.rulesDictionary[this.fieldName];

        if (!this.rules) {
            this.rules = [];
        }

        scope[this.controllerAs].isFieldValid = this.isFieldValid;
        scope[this.controllerAs].errors = this.errors;
        scope[this.controllerAs].showError = this.showError;

        if (!this.fieldName) {
            throw new Error('Empty field name.');
        }
    }

    /**
     * checks if error could be shown.
     */
    private showError = (error: IMessage): boolean => {

        if (ValidationUtilities.IsRule(error)) {
            let rule: IValidationRule = <IValidationRule>error;
            return ErrorProcessor.ruleHasError(this.fieldName, rule.attribute, this.form);
        }

        return true;
    }

    /**
     * gets the errors for this field.
     */
    private errors = (): IMessage[] => {

        let rulesMessage: IMessage[] = this.rules;
        let serverErrors: IMessage[] = ErrorProcessor.getFieldServerErrors(this.fieldName, this.form);

        return rulesMessage.concat(serverErrors);
    }

    /**
     * checks if field is valid.
     */
    private isFieldValid = (): boolean => {
        return ErrorProcessor.isFieldValid(this.fieldName, this.form);
    }
}