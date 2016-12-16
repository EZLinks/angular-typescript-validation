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
Plugin contains of two directives. `ValidatableFieldDirective` makes a watch on the model field, `ValidationMessageDirective` shows error messages related to some field.
To make things work, **you must register those directives first**. This plugin does not provide any existing angular module for flexibility purposes.

```typescript
// import directives from library
import { ValidatableFieldDirective, ValidationMessageDirective } from 'angular-typescript-validation';

// create your module first
let yourModule = angular.module('YourModuleName', []);

// setup directives, you can use different directive names if you wish to
commonModule.directive('validatableField', () => new ValidatableFieldDirective());
commonModule.directive('validationMessage', () => new ValidationMessageDirective());
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
import { ValidatableController } from 'angular-typescript-validation';

import { LoginValidator } from 'validators/loginValidator';
import { LoginModel } from 'models/login/loginModel';

export class LoginController extends ValidatableController {

    static $inject = [
        '$scope'];

    /**
     * makes request to login.
     */
    public submit = () => {
        
        this.validate(this.model).then((result) => {
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
        private model = new LoginModel(),
        validator = new LoginValidator()) {
        super($scope, validator.rulesCustomizer);    
    }

    /**
     * gets the name of the form.
     */
    public formName(): string {
        return 'loginForm';
    }
}
```

### Setup component html

```html
        <form name="{{l.formName()}}" class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon" />
                        <input type="text" name="username" ng-model="l.model.username" placeholder="Username" validatable-field/>
                    </div>
                    <validation-message data-for="username"></validation-message>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon" />
                        <input type="password" name="password" ng-model="l.model.password" placeholder="Password" validatable-field/>
                    </div>
                    <validation-message data-for="password"></validation-message>
                </div>
                <div class="ui fluid large blue submit button" ng-click="l.submit()">Login</div>
            </div>
        </form>
```

Notice the **validatable-field** directive is applied to inputs and **validation-message** directive to display messages for related field.
`ValidatableController` has a method `addServerError`, it will help you to make server validation. For the reasons of valiation response 
differences, plugin does not contain server error parsing from the box.