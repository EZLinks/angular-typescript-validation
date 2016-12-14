import 'angular';

import { ValidatableFieldDirective } from '../directives/validatableField/validatableField';
import { ValidationMessageDirective } from '../directives/validationMessage/validationMessage';

let moduleName: string = 'ANG.Validation';
let validationModule: ng.IModule = angular.module(moduleName, []);

validationModule.directive('validatableField', () => new ValidatableFieldDirective());
validationModule.directive('validationMessage', () => new ValidationMessageDirective());

export default moduleName;