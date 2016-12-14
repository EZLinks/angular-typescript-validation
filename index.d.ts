// Declare namespace
declare namespace atv {

	/**
	 * configurations.
	 */
	class ValidationConfig {
	    /**
	     * name of the angular module where the validation directives are hold.
	     */
		validationModuleName: string;
	    /**
	     * debounce delay of ms between server requests while user is typing into input field.
	     */
		validationTimoutMs: number;
	    /**
	     * callback, occurs when some field error occured, could be used for ui purposes.
	     */
		fieldErrorHandler: (isError: boolean, element: any, fieldName: string) => void;
	    /**
	     * template url for validation messages directive.
	     */
		templateUrl: string;
	}

	/**
	 * messaging interface
	 */
	interface IMessage {
	    /**
	     * message.
	     */
		message: string;
	}

	/**
	 * server error container.
	 */
	class ServerError implements IMessage {
		message: string;
	    /**
	     * init error
	     */
		constructor(message: string);
	}

	/**
	 * global methods for error processing.
	 */
	class ErrorProcessor {
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
	}

	/**
	 * base interface for validation rule.
	 */
	interface IValidationRule extends IMessage {
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

	/**
	 * interface for rules customizations.
	 */
	interface IRulesCustomizer {
	    /**
	     * dictionary of rules.
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

	/**
	 * base methods for validation purposes.
	 */
	class ValidationCore {
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

	/**
	 * base controller class for validation purposes.
	 */
	abstract class ValidatableController {
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
		protected addServerError(fieldName: string, errorMesage: string): void;
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

	/**
	 * helps to define validation rules for models.
	 */
	class RulesCustomizer<T extends Object> implements IRulesCustomizer {
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
		required(keyFunc: (obj: T) => void, message: string): void;
	    /**
	     * max length valudation rule
	     *
	     * @param keyFunc
	     * @param value
	     * @param message
	     */
		maxlen(keyFunc: (obj: T) => void, value: number, message: string): void;
	    /**
	     * min length validation rule
	     *
	     * @param keyFunc
	     * @param value
	     * @param message
	     */
		minlen(keyFunc: (obj: T) => void, value: number, message: string): void;
	    /**
	     * sets real time validation of the field.
	     *
	     * @param keyFunc
	     * @param validationCall
	     * @param message
	     */
		serverValidation(keyFunc: (obj: T) => void, validationCall: (value: any) => Promise<boolean>, message: string): void;
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

	/**
	 * for module init purposes.
	 */
	class InitValidationModuleProvider {
		private static configuration;
	    /**
	     * inits validation module.
	     */
		static init(config?: ValidationConfig): void;
	    /**
	     * sets value to object if value is defined.
	     */
		private static setIfDefined(obj, fieldName, value);
	    /**
	     * default timeout validation.
	     */
		private static readonly defaultTimeoutMs;
	    /**
	     * default module name.
	     */
		private static readonly defaultModuleName;
	    /**
	     * default messages template Url.
	     */
		private static readonly defaultTemplateUrl;
	    /**
	     * default error handler.
	     */
		private static defaultFieldErrorHandler;
	    /**
	     * gets the config.
	     */
		static readonly config: ValidationConfig;
	}

	/**
	 * directive for validation purposes.
	 * inits watch on the model and validates changes in the model automatically.
	 */
	class ValidatableFieldDirective implements ng.IDirective {
		restrict: string;
		require: string;
		private fieldName;
		private seqRules;
		private form;
		private timer;
	    /**
	     * link for directive.
	     *
	     * @param scope
	     * @param element
	     * @param attrs
	     * @param ctrl
	     */
		link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
	    /**
	     * inits the main fields needed to proper work of the directive.
	     *
	     * @param scope - scope
	     * @param element - input element
	     * @param attrs - element attributes.
	     * @param ctrl - controller.
	     * @returns {boolean}
	     */
		private initFields(scope, element, attrs, ctrl);
	    /**
	     * makes a watch on the model value.
	     *
	     * @param scope - scope
	     * @param attr - element attributes
	     */
		private watchModel(scope, attr);
	}

	/**
	 * interface for scope
	 */
	interface IValidationMessageScope extends ng.IScope {
		rules: IValidationRule[];
	}
	/**
	 * controller class
	 */
	class ValidationMessageController {
		$scope: IValidationMessageScope;
		static $inject: string[];
		constructor($scope: IValidationMessageScope);
	}
	/**
	 * directive for validation messages display.
	 */
	class ValidationMessageDirective implements ng.IDirective {
		restrict: string;
		scope: any;
		controller: any;
		controllerAs: string;
		replace: boolean;
		templateUrl: string;
		private fieldName;
		private formName;
		private element;
		private form;
		private rules;
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
		link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
	    /**
	     * inits the main fields needed to proper work of the directive.
	     *
	     * @param scope - scope
	     * @param element - input element
	     * @param attrs - element attributes.
	     * @param ctrl - controller.
	     * @returns {boolean}
	     */
		private initFields(scope, element, attrs, ctrl);
	    /**
	     * makes watch to apply error to field if needed.
	     *
	     * @param scope
	     */
		private watchError(scope);
	    /**
	     * checks if form is invalid.
	     */
		private formHasError;
	    /**
	     * checks if error could be shown.
	     */
		private showError;
	    /**
	     * gets the errors for this field.
	     */
		private errors;
	    /**
	     * checks if field is valid.
	     */
		private isFieldValid();
	}

	/**
	 * base interface for container that stores validation rules.
	 */
	interface IValidator {
	    /**
	     * returns rules customizer object.
	     */
		rulesCustomizer: IRulesCustomizer;
	}
}