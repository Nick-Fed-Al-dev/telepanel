import * as validator from "express-validator"

export class TariffValidator {

    public static validateParamUserId() {
        return [
            validator
                .param("userId", "request params should contain user id")
                .isInt()
        ]
    }

    public static validateBodyId() {
        return validator
                .check("id", "tariff object should contain id")
                .isInt()
    }

    public static validateBodyUserId() {
        return validator
                .check("userId", "tariff object should contain user id")
                .isInt()
    }

    public static validateBodyName() {
        return validator
                .check("name", "tariff object should contain name")
                .isString()
                .notEmpty()
    }

    public static validateBodyPeriod() {
        return validator
                .check("period", "tariff object should contain period")
                .isInt()
    }

    public static validateChanges() {
        return [
            TariffValidator.validateBodyName(),
            TariffValidator.validateBodyPeriod()
        ]
    }

}