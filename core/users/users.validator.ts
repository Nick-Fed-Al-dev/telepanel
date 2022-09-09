import * as validator from "express-validator"

export class UsersValidator {

    private static validateEmail(){
        return validator
            .check('email', 'incorrect email format')
            .isEmail()
    }

    private static validatePassword(){
        return validator
            .check('password', 'password min length is 6')
            .isLength({min: 6})
    }

    private static validateFirstName(){
        return validator
            .check('firstName', 'first name should have length')
            .isLength({min: 1})
    }

    private static validateSecondName(){
        return validator
            .check('secondName', 'second name should have length')
            .isLength({min: 1})
    }

    private static validateAge(){
        return validator
            .check('age', 'age should be a number more then 4 less then 150')
            .isFloat({min: 4, max: 150})
    }

    public static validateRegister(){
        return [
            this.validateAge(),
            this.validateEmail(),
            this.validateFirstName(),
            this.validatePassword(),
            this.validateSecondName()
        ]
    }

    public static validateLogin(){
        return [
            this.validateEmail(),
            this.validatePassword()
        ]
    }

    public static validateCookie(){
        return [
            validator
                .cookie('refreshToken', 'cookies should contain refresh token')
                .isJWT()
        ]
    }
}