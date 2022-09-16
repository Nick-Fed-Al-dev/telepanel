import * as validator from "express-validator"

// класс для валидации запросов
// каждый метод возвращает цепи валидаций
// валидация представляет собой условие типа isEmail
export class UserValidator {

    private static validateEmail(){
        return validator
            .check("email", "incorrect email format")
            .isEmail()
    }

    private static validatePassword(){
        return validator
            .check("password", "password min length is 6")
            .isLength({min: 6})
    }

    public static validateRegister(){
        return [
            this.validateEmail(),
            this.validatePassword()
        ]
    }

    public static validateLogin(){
        return [
            this.validateEmail(),
            this.validatePassword()
        ]
    }

    public static validateActivation() {
        return [
            validator
                .param("code", "request params should contain uuid code")
                .isUUID()
        ]
    }

    public static validateCookie(){
        return [
            validator
                .cookie("refreshToken", "cookies should contain refresh token")
                .isJWT()
        ]
    }
}