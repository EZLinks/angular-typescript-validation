declare module 'angular-typescript-validation' {
	/**
	 * configurations.
	 */
	export class ValidationConfig {
	    /**
	     * debounce delay of ms between server requests while user is typing into input field.
	     */
	    validationTimoutMs: number;
	    /**
	     * callback, occurs when some field error occured, could be used for ui purposes.
	     */
	    fieldErrorHandler: (isError: boolean, element: any, fieldName: string) => void;
	    /**
	     * template html for validation messages directive.
	     */
	    templateHtml: string;
	}

}
declare module 'angular-typescript-validation' {
	/**
	 * messaging interface
	 */
	export interface IMessage {
	    /**
	     * message.
	     */
	    message: string;
	}

}
declare module 'angular-typescript-validation' {
	import { IMessage } from '../interfaces/message';
	/**
	 * server error container.
	 */
	export class ServerError implements IMessage {
	    message: string;
	    /**
	     * init error
	     */
	    constructor(message: string);
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="angular" />
	import 'angular';
	import { ServerError } from '../models/serverError';
	/**
	 * global methods for error processing.
	 */
	export class ErrorProcessor {
	    private static validationAttr;
	    private static serverValidationAttr;
	    private static serverErrorsAttr;
	    /**
	    * sets/unsets error message
	    *
	    * @param isError
	    * @param fieldName
	    * @param ruleAttribute
	    */
	    static setFieldError(fieldName: string, ruleAttribute: string, form: ng.IFormController): void;
	    /**
	     * adds the server error related to the field.
	     */
	    static addServerFieldError(fieldName: string, errorMessage: string, form: ng.IFormController): void;
	    /**
	     *  clears all errors for field.
	     */
	    static clearFieldErrors(fieldName: string, form: ng.IFormController): void;
	    /**
	    * clears all validation errors.
	    */
	    static clearAllFormErrors(form: ng.IFormController): void;
	    /**
	    * checks if rule has error.
	    */
	    static ruleHasError(fieldName: string, attribute: string, form: ng.IFormController): boolean;
	    /**
	     * returns the server errors for field
	     */
	    static getFieldServerErrors(fieldName: string, form: ng.IFormController): ServerError[];
	    /**
	     * checks if field is valid.
	     */
	    static isFieldValid(fieldName: string, form: ng.IFormController): boolean;
	    /**
	     * checks attrs for existance.
	     */
	    static checkAttrs(fieldName: string, form: ng.IFormController, attr: string): boolean;
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="es6-shim" />
	import { IMessage } from 'message';
	/**
	 * base interface for validation rule.
	 */
	export interface IValidationRule extends IMessage {
	    /**
	     * key related to validation action.
	     */
	    attribute: string;
	    /**
	     * name of the property.
	     */
	    propertyName: string;
	    /**
	     * validate action.
	     *
	     * @param value - value to be validated.
	     * @returns {Promise<boolean>}
	     */
	    validate(value: any): Promise<boolean>;
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from 'validationRule';
	/**
	 * interface for rules customizations.
	 */
	export interface IRulesCustomizer {
	    /**
	     * dictionaty of rules.
	     */
	    rulesDictionary: Map<string, IValidationRule[]>;
	    /**
	     * sequence of rules.
	     */
	    rules: Array<Array<IValidationRule>>;
	    /**
	     * gets the sequence rules for property.
	     */
	    seqRules(key: string): Array<Array<IValidationRule>>;
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="es6-shim" />
	import 'angular';
	import { IValidationRule } from '../interfaces/validationRule';
	import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
	/**
	 * base methods for validation purposes.
	 */
	export class ValidationCore {
	    /**
	     * makes entity validation - client side and real time server side.
	     *
	     * @param entity
	     * @param customizer
	     * @param handleRuleResult
	     */
	    static validateEntity(entity: Object, customizer: IRulesCustomizer, handleRuleResult: (rule: IValidationRule, result: boolean) => void): Promise<boolean>;
	    /**
	     * recursively validates rules.
	     *
	     * @param entity
	     * @param seqRules
	     * @param sequence
	     * @param handleRuleResult
	     */
	    static validateRules(entity: Object, seqRules: Array<Array<IValidationRule>>, sequence: number, handleRuleResult: (rule: IValidationRule, result: boolean) => void): Promise<boolean>;
	}

}
declare module 'angular-typescript-validationer' {
	/// <reference types="angular" />
	/// <reference types="es6-shim" />
	import 'angular';
	import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
	/**
	 * base controller class for validation purposes.
	 */
	export abstract class ValidatableController {
	    protected scope: ng.IScope;
	    rulesCustomizer: IRulesCustomizer;
	    /**
	     * inits controller.
	     *
	     * @param scope
	     * @param validator
	     * @param entity
	     */
	    constructor(scope: ng.IScope, rulesCustomizer: IRulesCustomizer);
	    /**
	     * validation call.
	     */
	    protected validate(entity: Object): Promise<boolean>;
	    /**
	     * adds the server error to form validation.
	     */
	    protected addServerError: (fieldName: string, errorMesage: string) => void;
	    /**
	     * gets the form scope
	     *
	     * @returns {ng.IFormController}
	     */
	    readonly form: ng.IFormController;
	    /**
	     * validation form name.
	     */
	    abstract formName(): string;
	}

}
declare module 'angular-typescript-validationionRule' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from '../interfaces/validationRule';
	/**
	 * rule for required.
	 */
	export class RequiredValidationRule implements IValidationRule {
	    propertyName: string;
	    message: string;
	    /**
	     * init rule
	     *
	     * @param message
	     */
	    constructor(propertyName: string, message: string);
	    /**
	     * action key.
	     *
	     * @returns {string}
	     */
	    readonly attribute: string;
	    /**
	     * validate action.
	     *
	     * @param value
	     */
	    validate(value: any): Promise<boolean>;
	}

}
declare module 'angular-typescript-validationnRule' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from '../interfaces/validationRule';
	/**
	 * rule for real time server validation.
	 */
	export class RealTimeServerValidationRule implements IValidationRule {
	    propertyName: string;
	    private validationCall;
	    message: string;
	    /**
	     * inits rule
	     *
	     * @param validationCall
	     * @param message
	     */
	    constructor(propertyName: string, validationCall: (value: any) => Promise<boolean>, message: string);
	    /**
	     * action key
	     *
	     * @returns {string}
	     */
	    readonly attribute: string;
	    /**
	     * validate action
	     * @param value
	     */
	    validate(value: any): Promise<boolean>;
	}

}
declare module 'angular-typescript-validationnRule' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from '../interfaces/validationRule';
	/**
	 * rule for min lenght.
	 */
	export class MinLenValidationRule implements IValidationRule {
	    propertyName: string;
	    private data;
	    message: string;
	    /**
	     * inits rule.
	     *
	     * @param data
	     * @param message
	     */
	    constructor(propertyName: string, data: number, message: string);
	    /**
	     * action key
	     *
	     * @returns {string}
	     */
	    readonly attribute: string;
	    /**
	     * validation action
	     *
	     * @param value
	     */
	    validate(value: any): Promise<boolean>;
	}

}
declare module 'angular-typescript-validationnRule' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from '../interfaces/validationRule';
	/**
	 * validation rule for max length.
	 */
	export class MaxLenValidationRule implements IValidationRule {
	    propertyName: string;
	    private data;
	    message: string;
	    /**
	     * inits rule
	     * @param data
	     * @param message
	     */
	    constructor(propertyName: string, data: number, message: string);
	    /**
	     * action key.
	     *
	     * @returns {string}
	     */
	    readonly attribute: string;
	    /**
	     * validate action.
	     * @param value
	     */
	    validate(value: any): Promise<boolean>;
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="angular" />
	import 'angular';
	import { ValidatableController } from '../controllers/validatableController';
	import { IMessage } from '../interfaces/message';
	/**
	 * base methods for validation purposes.
	 */
	export class ValidationUtilities {
	    /**
	     * tries to find controller in scope
	     *
	     * @param scope
	     */
	    static getController(scope: ng.IScope): ValidatableController;
	    /**
	     * checks if object is rule.
	     */
	    static IsRule(object: IMessage): boolean;
	    /**
	     * gets property name from expression.
	     */
	    static fromExpression<T>(func: (obj: T) => void): string;
	}

}
declare module 'angular-typescript-validation' {
	/// <reference types="es6-shim" />
	import { IValidationRule } from '../interfaces/validationRule';
	import { IRulesCustomizer } from '../interfaces/rulesCustomizer';
	/**
	 * helps to define validation rules for models.
	 */
	export class RulesCustomizer<T extends Object> implements IRulesCustomizer {
	    private rulesMap;
	    private ruleSequense;
	    /**
	     * inits rules customizer.
	     *
	     * @param rulesMap
	     */
	    constructor(rulesMap?: Map<string, IValidationRule[]>, ruleSequense?: Array<Array<IValidationRule>>);
	    /**
	     * makes field required.
	     *
	     * @param keyFunc
	     * @param message
	     */
	    required(func: (obj: T) => void, message: string): void;
	    /**
	     * max length valudation rule
	     *
	     * @param keyFunc
	     * @param value
	     * @param message
	     */
	    maxlen(func: (obj: T) => void, value: number, message: string): void;
	    /**
	     * min length validation rule
	     *
	     * @param keyFunc
	     * @param value
	     * @param message
	     */
	    minlen(func: (obj: T) => void, value: number, message: string): void;
	    /**
	     * sets real time validation of the field.
	     *
	     * @param keyFunc
	     * @param validationCall
	     * @param message
	     */
	    serverValidation(func: (obj: T) => void, validationCall: (value: any) => Promise<boolean>, message: string): void;
	    /**
	     * adds validation rule to the dictionary.
	     *
	     * @param key
	     * @param rule
	     */
	    protected addRule(key: string, rule: IValidationRule): void;
	    /**
	     * gets the sequence rules for property.
	     */
	    seqRules(key: string): Array<Array<IValidationRule>>;
	    /**
	     * gets all validation rules.
	     *
	     * @returns {Map<string, IValidationRule[]>}
	     */
	    readonly rulesDictionary: Map<string, IValidationRule[]>;
	    /**
	     * get rules sequence.
	     *
	     * @returns {Array<Array<IValidationRule>>}
	     */
	    readonly rules: Array<Array<IValidationRule>>;
	}

}
declare module 'angular-typescript-validationer' {
	import 'angular';
	import { ValidationConfig } from '../config/validationConfig';
	/**
	 * for module init purposes.
	 */
	export class InitValidationModuleProvider {
	    private static configuration;
	    /**
	     * inits validation module.
	     */
	    static init(config?: ValidationConfig): ValidationConfig;
	    /**
	     * sets value to object if value is defined.
	     */
	    private static setIfDefined(obj, fieldName, value);
	    /**
	     * default timeout validation.
	     */
	    private static readonly defaultTimeoutMs;
	    /**
	     * default messages template Html.
	     */
	    private static readonly defaultTemplateHtml;
	    /**
	     * gets the config.
	     */
	    static readonly config: ValidationConfig;
	}

}
declare module 'angular-typescript-validationidatableField' {
	/// <reference types="angular" />
	import 'angular';
	/**
	 * directive for validation purposes.
	 * inits watch on the model and validates changes in the model automatically.
	 */
	export class ValidatableFieldDirective implements ng.IDirective {
	    restrict: string;
	    require: string;
	    /**
	     * creates a new instance of directive
	     */
	    static factory(): ValidatableFieldDirective;
	    /**
	     * link for directive.
	     *
	     * @param scope
	     * @param element
	     * @param attrs
	     * @param ctrl
	     */
	    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void;
	}

}
declare module 'angular-typescript-validationlidationMessage' {
	/// <reference types="angular" />
	import 'angular';
	import { IValidationRule } from '../../interfaces/validationRule';
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
	    $scope: IValidationMessageScope;
	    static $inject: string[];
	    constructor($scope: IValidationMessageScope);
	}
	/**
	 * directive for validation mesages display.
	 */
	export class ValidationMessageDirective implements ng.IDirective {
	    restrict: string;
	    scope: any;
	    controller: any;
	    controllerAs: string;
	    replace: boolean;
	    template: string;
	    /**
	     * creates a new instance of directive
	     */
	    static factory(): ValidationMessageDirective;
	    /**
	     * inits directive
	     */
	    constructor();
	    /**
	     * link for directive.
	     *
	     * @param scope
	     * @param element
	     * @param attrs
	     * @param ctrl
	     */
	    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void;
	}

}
declare module 'angular-typescript-validation' {
	import { IRulesCustomizer } from 'rulesCustomizer';
	/**
	 * base interface for container that stores validation rules.
	 */
	export interface IValidator {
	    /**
	     * returns rules customizer object.
	     */
	    rulesCustomizer: IRulesCustomizer;
	}

}
declare module 'angular-typescript-validation' {
	import { ValidationConfig } from 'config/validationConfig';
	import { ValidatableController } from 'controllers/validatableController';
	import { ValidationCore } from 'core/validationCore';
	import { RulesCustomizer } from 'customizer/rulesCustomizer';
	import { ValidatableFieldDirective } from 'directives/validatableField/validatableField';
	import { ValidationMessageDirective } from 'directives/validationMessage/validationMessage';
	import { InitValidationModuleProvider } from 'init/initValidationModuleProvider';
	import { IMessage } from 'interfaces/message';
	import { IRulesCustomizer } from 'interfaces/rulesCustomizer';
	import { IValidationRule } from 'interfaces/validationRule';
	import { IValidator } from 'interfaces/validator';
	import { ServerError } from 'models/serverError';
	import { ErrorProcessor } from 'utils/errorProcessor';
	import { ValidationUtilities } from 'utils/validationUtilities';
	export { ValidationConfig, ValidatableController, ValidationCore, RulesCustomizer, ValidatableFieldDirective, ValidationMessageDirective, InitValidationModuleProvider, IMessage, IRulesCustomizer, IValidationRule, IValidator, ServerError, ErrorProcessor, ValidationUtilities };

}
