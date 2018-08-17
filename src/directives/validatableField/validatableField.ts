import 'angular';

import { IValidationRule } from '../../interfaces/validationRule';
import { InitValidationModuleProvider } from '../../init/initValidationModuleProvider';
import { IValidatableController } from '../../controllers/validatableController';
import { ValidationUtilities } from '../../utils/validationUtilities';
import { ErrorProcessor } from '../../utils/errorProcessor';
import { ValidationCore } from '../../core/validationCore';

/**
 * directive for validation purposes.
 * inits watch on the model and validates changes in the model automatically.
 */
export class ValidatableFieldDirective implements ng.IDirective {

    public restrict: string = 'A';
    public require: string = 'ngModel';
    public scope: any = { validatableField: '=', validatableGroup: '@' };

    /**
     * creates a new instance of directive
     */
    public static factory(): ValidatableFieldDirective {
        return new ValidatableFieldDirective();
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
        let basicController: IValidatableController = ValidationUtilities.getController(scope.validatableField);
        if (worker.initFields(scope, element, attrs, basicController, scope.validatableGroup)) {
            worker.watchModel(scope);
            worker.watchError(scope);
        }
    }
}

/**
 * class for processing directive tasks.
 */
class DirectiveWorker {

    private element: any;
    private fieldName: string;
    private seqRules: Array<Array<IValidationRule>>;
    private form: ng.IFormController;
    private item: any;

    private timer: any = null;
    private groupFields: Array<string> = new Array<string>();

    /**
     * inits the main fields needed to proper work of the directive.
     *
     * @param scope - scope
     * @param element - input element
     * @param attrs - element attributes.
     * @param ctrl - controller.
     * @param validatableGroup - the fields which should be validated as well on this item validation.
     * @returns {boolean}
     */
    public initFields(
        scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attrs: ng.IAttributes,
        ctrl: IValidatableController,
        validatableGroup: string
    ): boolean {

        this.element = element;    
        this.fieldName = attrs['name'];
        this.form = ctrl.form;
        this.seqRules = ctrl.rulesCustomizer.seqRules(this.fieldName);
        this.item = ctrl.item;
        
        if (validatableGroup) {
            this.groupFields = validatableGroup.split(',');            
        }

        this.groupFields.push(this.fieldName);

        if (this.seqRules && this.seqRules.length) {
            return true;
        }

        return false;
    }

    /**
     * makes a watch on the model value.
     *
     * @param scope - scope
     * @param attr - element attributes
     */
    public watchModel(scope: ng.IScope): void {

        scope.$watch(`validatableField.item.${this.fieldName}`,
            (newVal: any, oldVal: any) => {

                if (newVal !== oldVal) {

                    for (let i = 0; i < this.groupFields.length; i++) { 
                        ErrorProcessor.clearFieldErrors(this.groupFields[i], this.form);
                    }

                    if (this.timer) {
                        clearTimeout(this.timer);
                    }

                    this.timer = setTimeout(() => {                            

                            ValidationCore.validateRules(this.item,
                                this.seqRules,
                                0,
                                (rule: IValidationRule, result: boolean) => {

                                    if (!result) {
                                        scope.$apply(() => {

                                            for (let i = 0; i < this.groupFields.length; i++) { 
                                                ErrorProcessor.setFieldError(this.groupFields[i], rule.attribute, this.form);
                                            }
                                            
                                        });
                                    }
                                });
                        },
                        InitValidationModuleProvider.config.validationTimoutMs);
                }
            });
    }

    /**
     * makes watch to apply error to field if needed.
     * 
     * @param scope
     */
    public watchError(scope: ng.IScope): void {

        scope.$watch(`validatableField.form.$error["${this.fieldName}"]`,
            (newVal: any, oldVal: any) => {

                if (newVal !== oldVal) {
                    let isFieldValid = ErrorProcessor.isFieldValid(this.fieldName, this.form);
                    InitValidationModuleProvider.config.fieldErrorHandler(!isFieldValid, this.element, this.fieldName);
                }
            });
    }
}
