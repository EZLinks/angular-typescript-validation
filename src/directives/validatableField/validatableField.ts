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
    public scope: any = { validatableField: '=' };

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
        if (worker.initFields(scope, element, attrs, basicController)) {
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

    private timer: any = null;

    /**
     * inits the main fields needed to proper work of the directive.
     *
     * @param scope - scope
     * @param element - input element
     * @param attrs - element attributes.
     * @param ctrl - controller.
     * @returns {boolean}
     */
    public initFields(
        scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attrs: ng.IAttributes,
        ctrl: IValidatableController): boolean {

        this.element = element;    
        this.fieldName = attrs['name'];
        this.form = ctrl.form;
        this.seqRules = ctrl.rulesCustomizer.seqRules(this.fieldName);

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

        scope.$watch(`validatableField.model.${this.fieldName}`,
            (newVal: any, oldVal: any) => {

                if (newVal !== oldVal) {

                    ErrorProcessor.clearFieldErrors(this.fieldName, this.form);

                    if (this.timer) {
                        clearTimeout(this.timer);
                    }

                    this.timer = setTimeout(() => {

                            let entity: Object = {};
                            entity[this.fieldName] = newVal;

                            ValidationCore.validateRules(entity,
                                this.seqRules,
                                0,
                                (rule: IValidationRule, result: boolean) => {

                                    if (!result) {
                                        scope.$apply(() => {
                                            ErrorProcessor.setFieldError(this.fieldName, rule.attribute, this.form);
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

        scope.$watch(`validatableField.form.$error.${this.fieldName}`,
            (newVal: any, oldVal: any) => {

                if (newVal !== oldVal) {
                    let isFieldValid = ErrorProcessor.isFieldValid(this.fieldName, this.form);
                    InitValidationModuleProvider.config.fieldErrorHandler(!isFieldValid, this.element, this.fieldName);
                }
            });
    }
}
