import * as validator from "express-validator"

export class AccountValidator {

    public static validatePhoneNumber() {
        return [
            validator.check("phone", "request should include phone number")
                .isMobilePhone("ru-RU")
        ]
    }

    public static validatePhoneCode() {
        return [
            validator.check("code", "request should contain sms code")
                .isInt()
        ]
    }

    public static validateParamAccountId() {
        return [
            validator.param("accountId", "request params should contain account id")
        ]
    }

    public static validateAccountLogin() {
        return [
            ...AccountValidator.validateParamAccountId(),
            ...AccountValidator.validatePhoneCode()
        ]
    }

}