import 'angular';

import { IValidationRule } from '../../interfaces/validationRule';
import { InitValidationModuleProvider } from '../../init/initValidationModuleProvider';
import { ValidatableController } from '../../controllers/validatableController';
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

    private fieldName: string;
    private seqRules: Array<Array<IValidationRule>>;
    private form: ng.IFormController;

    private timer: NodeJS.Timer = null;

    /**
     * link for directive.
     * 
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     */
    public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        let basicController: ValidatableController = ValidationUtilities.getController(scope);
        if (this.initFields(scope, element, attrs, basicController)) {
            this.watchModel(scope, attrs);
        }
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
    private initFields(
        scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attrs: ng.IAttributes,
        ctrl: ValidatableController): boolean {

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
    private watchModel(scope: ng.IScope, attr: ng.IAttributes): void {

        scope.$watch(attr['ngModel'],
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
}