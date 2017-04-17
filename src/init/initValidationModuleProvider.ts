import 'angular';

import { ValidationConfig } from '../config/validationConfig';

/**
 * for module init purposes.
 */
export class InitValidationModuleProvider {
    
    /**
     * inits validation module.
     */
    public static init(config?: ValidationConfig): ValidationConfig {

        // init configuration
        this.configuration = new ValidationConfig();

        this.configuration.fieldErrorHandler = (isError: boolean, element: any, fieldName: string) => {
            element.parents('form').find('[name=' + fieldName + ']').parents('.field').toggleClass('error', isError);
        };

        this.configuration.templateHtml = this.defaultTemplateHtml;
        this.configuration.summaryTemplateHtml = this.defaultSummaryTemplateHtml;
        this.configuration.validationTimoutMs = this.defaultTimeoutMs;

        if (config) {

            this.setIfDefined(this.configuration, 'fieldErrorHandler', config.fieldErrorHandler);
            this.setIfDefined(this.configuration, 'templateHtml', config.templateHtml);
            this.setIfDefined(this.configuration, 'validationTimoutMs', config.validationTimoutMs);
        }

        return this.configuration;
    }

    private static configuration: ValidationConfig = InitValidationModuleProvider.init();

    /**
     * sets value to object if value is defined.
     */
    private static setIfDefined(obj: Object, fieldName: string, value: any): void {

        if (value !== undefined) {
            obj[fieldName] = value;
        }
    }

    /**
     * default timeout validation.
     */
    private static get defaultTimeoutMs(): number {
        return 100;
    }

    /**
     * default messages template Html.
     */
    private static get defaultTemplateHtml(): string {
        return `<div class="ui error message" style="display: block;" ng-show="vm.isFieldValid() === false"> 
                <ul class="list"> 
                <li ng-repeat="error in vm.errors()" ng-show="vm.showError(error)">{{ error.message | translate }}</li>
                </ul>
                </div>`;
    }

    /**
     * default summary template Html.
     */
    private static get defaultSummaryTemplateHtml(): string {
        return `<div ng-show="vs.hasErrors()" style="display: block;" class="ui error message">
                <ul class="list">
                <li ng-repeat="error in vs.errors" ng-show="vs.showError(error)">{{ error.message | translate }}</li>
                </ul>
                </div>`;                           
    }

    /**
     * gets the config.
     */
    public static get config(): ValidationConfig {
        return this.configuration;
    }
}