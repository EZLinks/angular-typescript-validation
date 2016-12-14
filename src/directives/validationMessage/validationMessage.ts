import 'angular';

import { IValidationRule } from '../../interfaces/validationRule';
import { ValidatableController } from '../../controllers/validatableController';
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
    public scope: any = {};
    public controller: any = ValidationMessageController;
    public controllerAs: string = 'vm';
    public replace: boolean = true;
    public templateUrl: string;

    private fieldName: string;
    private formName: string;
    private element: any;
    private form: ng.IFormController;
    private rules: IValidationRule[];

    /**
     * inits directive
     */
    constructor() {
        this.templateUrl = InitValidationModuleProvider.config.templateUrl;
    }

    /**
     * link for directive.
     * 
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        let basicController: ValidatableController = ValidationUtilities.getController(scope.$parent);
        this.initFields(scope, element, attrs, basicController);
        this.watchError(scope);
    }

    /**
     * inits the main fields needed to proper work of the directive.
     * 
     * @param scope - scope
     * @param element - input element
     * @param attrs - element attributes.
     * @param ctrl - controller.
     * @returns {boolean}
     */
    private initFields(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ValidatableController): void {

        this.element = element;
        this.fieldName = attrs['for'];
        this.form = ctrl.form;
        this.formName = ctrl.formName();
        this.rules = ctrl.rulesCustomizer.rulesDictionary[this.fieldName];

        if (!this.rules) {
            this.rules = [];
        }

        scope[this.controllerAs].formHasError = this.formHasError;
        scope[this.controllerAs].errors = this.errors;
        scope[this.controllerAs].showError = this.showError;

        if (!this.fieldName) {
            throw new Error('Empty field name.');
        }
    }

    /**
     * makes watch to apply error to field if needed.
     * 
     * @param scope
     */
    private watchError(scope: ng.IScope): void {

        scope.$parent.$watch(`${this.formName}.$valid`,
            (newVal: any, oldVal: any) => {

                if (newVal !== oldVal) {
                    InitValidationModuleProvider.config.fieldErrorHandler(!this.isFieldValid(), this.element, this.fieldName);
                }
            }
        );
    }

    /**
     * checks if form is invalid.
     */
    private formHasError = (): boolean => {
        return this.form.$invalid;
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
    private isFieldValid(): boolean {
        return ErrorProcessor.isFieldValid(this.fieldName, this.form);
    }
}