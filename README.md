# angular-typescript-validation
Stores all your client side and real time server validation logics in one place, plugin provides similar way of validation as aurelia does.

## Installation
`npm install angular-typescript-validation --save` or `npm install https://github.com/VladislavSudakov/angular-typescript-validation.git --save`

## Configuration
Please take a look at `src/config/ValidationConfig.ts` for configurable options. If you wish to setup new options, you need to make a call to init provider with your configuration :

```typescript
// import directives from library
import { ValidationConfig, InitValidationModuleProvider } from 'angular-typescript-validation';

let yourConfig = new ValidationConfig();
yourConfig.validationTimoutMs = 10;

InitValidationModuleProvider.init(yourConfig);
```

## Basic Setup
Plugin contains three directives. `ValidatableFieldDirective` makes a watch on the model field, `ValidationMessageDirective` shows error messages related to some field and `ValidationSummaryDirective` shows the validation summary related to all form validation errors.

To make things work, **you must register those directives first**. This plugin does not provide any existing angular module for flexibility purposes.

```typescript
// import directives from library
import { ValidatableFieldDirective, ValidationMessageDirective, ValidationSummaryDirective } from 'angular-typescript-validation';

// create your module first
let yourModule = angular.module('YourModuleName', []);

// setup directives, you can use different directive names if you wish to
yourModule.directive('validatableField',  ValidatableFieldDirective.factory);
yourModule.directive('validationMessage', ValidationMessageDirective.factory);
yourModule.directive('validationSummary', ValidationSummaryDirective.factory)
```

## Usage
Simple validation example :

### Create validatable model

```typescript
// loginModel.ts

/**
 * login model.
 */
export class LoginModel {
    /**
     * username
     */
    public username: string;

    /**
     * password
     */
    public password: string;
}
```
### Create validator for model

```typescript
// loginValidator.ts

import {IValidator, IRulesCustomizer, RulesCustomizer } from 'angular-typescript-validation';

import {LoginModel} from 'models/login/loginModel';

/**
 * validator for login
 */
export class LoginValidator implements IValidator {
    /**
     * custom rules.
     */
    public get rulesCustomizer(): IRulesCustomizer {

        let customizer = new RulesCustomizer<LoginModel>();
        
        customizer.required(m => m.username, 'User name is required.');
        customizer.required(m => m.password, 'Password is required.');

        return customizer;
    }
}
```

### Setup component ts

```typescript
// loginComponent.ts

import 'angular';
import { IValidatableController, ValidationService, IValidationService, IRulesCustomizer, IValidator } from 'angular-typescript-validation';

import { LoginValidator } from 'validators/loginValidator';
import { LoginModel } from 'models/login/loginModel';

export class Login implements ng.IComponentOptions {
    public templateUrl: string;
    public controller: any;
    public controllerAs: string;
    public bindings: any;

    constructor() {        
        this.controller = LoginController;
        this.controllerAs = 'l';
        this.bindings = {
        };
    }
}

export class LoginController implements IValidatableController {
    
    /**
     * the validation service.
     */
    private validationService: IValidationService;

    /**
     * rulez of controller.
     */
    public rulesCustomizer: IRulesCustomizer;

    /**
     * The form element.
     */
    public form: any;

    /**
     * The one and only item
     * @binding
     */
    public item: LoginModel;

    static $inject = [
        '$scope'];

    /**
     * makes request to login.
     */
    public submit = () => {
        
        this.validationService.validate(this.item).then((result) => {
            if (result) {
                // validation is ok, we can make server request.  
            }
        });
    }

    /**
     * inits component.
     */
    constructor(
        private $scope: ng.IScope,
        validator = new LoginValidator()) {

        this.item = new LoginModel();    
        this.validationService = new ValidationService(this, $scope);
        this.rulesCustomizer = validator.rulesCustomizer;
    }
}
```

### Setup component html

```html
        <form name="l.form" class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon" />
                        <input type="text" name="username" ng-model="l.item.username" placeholder="Username" validatable-field="l" />
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon" />
                        <input type="password" name="password" ng-model="l.item.password" placeholder="Password" validatable-field="l" />
                    </div>
                </div>
                <div class="ui fluid large blue submit button" ng-click="l.submit()">Login</div>
            </div>

            <validation-summary data-ctrl="l"></validation-summary>

        </form>
```

Notice the **validatable-field** directive is applied to inputs, the value of attribute is a controller passed inside. It ensures those inputs will be highlighted red on validation error. The ```name``` attribute is required on validatable inputs and should be the same as the name of the field inside model. **This library uses semantic-ui, thus you may need to setup any css rules if you are using different components!!!**. To make it work with other ui library or custom one, create a div with the **field** class, like in the example above, and it will be set to **field error** class if validation error occured. Then, just make your own css rules to style your inputs accordingly. 

Another setup you will need to do is to set ```<form name="l.form"```, which assigns form variable to 
controller.

**validation-summary** directive displays error summary.


### Group validation

There could be a case when you need to set one global validation per > 1 fields, so that error in one field will reflect errors on others, and success on one field would remove red highlight from other fields as well. This scenario could be achieved using the ```validatable-group``` attribute on your validatable inputs. 

```html
        <form name="l.form" class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon" />
                        <input type="text" name="username" ng-model="l.item.username" placeholder="Username" validatable-field="l" validatable-group="password" />
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon" />
                        <input type="password" name="password" ng-model="l.item.password" placeholder="Password" validatable-field="l" validatable-group="username" />
                    </div>
                </div>
                <div class="ui fluid large blue submit button" ng-click="l.submit()">Login</div>
            </div>

            <validation-summary data-ctrl="l"></validation-summary>

        </form>
```

```typescript
/**
 * validator for login
 */
export class LoginValidator implements IValidator {
    /**
     * custom rules.
     */
    public get rulesCustomizer(): IRulesCustomizer {

        let customizer = new RulesCustomizer<LoginModel>();
        
        let error: string = 'Some error';

        customizer.clientValidation(m => m.username, (entity: LoginModel, value: string) => {
           return this.validateGlobal(entity);
        }, error);

        customizer.clientValidation(m => m.password, (entity: LoginModel, value: string) => {
            return this.validateGlobal(entity);
         }, error);

        return customizer;
    }

    private validateGlobal(model: LoginModel): boolean {

        if (model.username !== '') {
            return false;
        }

        return model.password !== '';
    }
}
```

The example above will provide validation errors for both username and password only if username is not set.

### Localized error messages

Library supports localization using the **angular-translate** library. You just need to setup this library and provide localized error message inside validator. There is already a ```translate``` filter set inside.

```typescript
import {IValidator, IRulesCustomizer, RulesCustomizer } from 'angular-typescript-validation';
import {LoginModel} from 'models/login/loginModel';

/**
 * validator for login
 */
export class LoginValidator implements IValidator {
    /**
     * custom rules.
     */
    public get rulesCustomizer(): IRulesCustomizer {

        let customizer = new RulesCustomizer<LoginModel>();
        
        customizer.required(m => m.username, 'USER_NAME_REQURED');
        customizer.required(m => m.password, 'PASSWORD_REQURED');

        return customizer;
    }
}
```

### Server side validation calls

The real time server validation calls are easy to implement using the same validator.

```typescript
customizer.serverValidation(m => m.username, (entity: LoginModel, value: string) => {
            
            // here you will need to provide a Promise<bool> of your request to server
            // which checks for the username availability

            return this.service.isUserNameAvailable(value);

        }, 'User name must be unique.');
```        

