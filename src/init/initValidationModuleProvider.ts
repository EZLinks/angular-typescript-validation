import 'angular';

import { ValidationConfig } from '../config/validationConfig';

/**
 * for module init purposes.
 */
export class InitValidationModuleProvider {

    private static configuration: ValidationConfig;

    /**
     * inits validation module.
     */
    public static init(config?: ValidationConfig): void {

        // init configuration
        this.configuration = new ValidationConfig();

        this.configuration.fieldErrorHandler = this.defaultFieldErrorHandler;
        this.configuration.templateUrl = this.defaultTemplateUrl;
        this.configuration.validationModuleName = this.defaultModuleName;
        this.configuration.validationTimoutMs = this.defaultTimeoutMs;

        if (config) {

            this.setIfDefined(this.configuration, 'fieldErrorHandler', config.fieldErrorHandler);
            this.setIfDefined(this.configuration, 'templateUrl', config.templateUrl);
            this.setIfDefined(this.configuration, 'validationModuleName', config.validationModuleName);
            this.setIfDefined(this.configuration, 'validationTimoutMs', config.validationTimoutMs);
        }
    }

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
     * default module name.
     */
    private static get defaultModuleName(): string {
        return 'ETN.Validation';
    }

    /**
     * default messages template Url.
     */
    private static get defaultTemplateUrl(): string {
        return 'directives/validationMessage.html';
    }

    /**
     * default error handler.
     */
    private static defaultFieldErrorHandler = (isError: boolean, element: any, fieldName: string) => {
        element.parents('.field').toggleClass('error', isError);
    }

    /**
     * gets the config.
     */
    public static get config(): ValidationConfig {
        return this.configuration;
    }
}