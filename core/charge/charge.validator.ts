import * as validator from "express-validator"

export class ChargeValidator {

    public static validateParamUserId() {
        return [
            validator
                .param("userId", "request params should contain user id")
                .isInt()
        ]
    }

}