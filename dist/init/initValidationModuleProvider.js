"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("angular");
var validationConfig_1 = require("../config/validationConfig");
/**
 * for module init purposes.
 */
var InitValidationModuleProvider = /** @class */ (function () {
    /* istanbul ignore next */ function InitValidationModuleProvider() {
    }
    /**
     * inits validation module.
     */
    InitValidationModuleProvider.init = function (config) {
        // init configuration
        this.configuration = new validationConfig_1.ValidationConfig();
        this.configuration.fieldErrorHandler = function (isError, element, fieldName) {
            $(element.parents('form').find('[name=' + fieldName + ']').parents('.field')[0]).toggleClass('error', isError);
        };
        this.configuration.templateHtml = this.defaultTemplateHtml;
        this.configuration.summaryTemplateHtml = this.defaultSummaryTemplateHtml;
        this.configuration.validationTimoutMs = this.defaultTimeoutMs;
        if (config) {
            this.setIfDefined(this.configuration, 'fieldErrorHandler', config.fieldErrorHandler);
            this.setIfDefined(this.configuration, 'templateHtml', config.templateHtml);
            this.setIfDefined(this.configuration, 'validationTimoutMs', config.validationTimoutMs);
            this.setIfDefined(this.configuration, 'summaryTemplateHtml', config.summaryTemplateHtml);
        }
        return this.configuration;
    };
    /**
     * sets value to object if value is defined.
     */
    InitValidationModuleProvider.setIfDefined = function (obj, fieldName, value) {
        if (value !== undefined) {
            obj[fieldName] = value;
        }
    };
    Object.defineProperty(InitValidationModuleProvider, "defaultTimeoutMs", {
        /**
         * default timeout validation.
         */
        get: function () {
            return 700;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitValidationModuleProvider, "defaultTemplateHtml", {
        /**
         * default messages template Html.
         */
        get: function () {
            return "<div class=\"ui error message\" style=\"display: block;\" ng-show=\"vm.isFieldValid() === false\"> \n                <ul class=\"list\"> \n                <li ng-repeat=\"error in vm.errors()\" ng-show=\"vm.showError(error)\">{{ error.message | translate }}</li>\n                </ul>\n                </div>";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitValidationModuleProvider, "defaultSummaryTemplateHtml", {
        /**
         * default summary template Html.
         */
        get: function () {
            return "<div ng-show=\"vs.hasErrors()\" style=\"display: block;\" class=\"ui error message\">\n                <ul class=\"list\">\n                <li ng-repeat=\"error in vs.errors\" ng-show=\"vs.showError(error)\">{{ error.message | translate }}</li>\n                </ul>\n                </div>";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitValidationModuleProvider, "config", {
        /**
         * gets the config.
         */
        get: function () {
            return this.configuration;
        },
        enumerable: true,
        configurable: true
    });
    InitValidationModuleProvider.configuration = InitValidationModuleProvider.init();
    return InitValidationModuleProvider;
}());
exports.InitValidationModuleProvider = InitValidationModuleProvider;

//# sourceMappingURL=initValidationModuleProvider.js.map
