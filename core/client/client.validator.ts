import * as validator from "express-validator"

export class ClientValidator {

    public static validateClientIdParam() {
        return [
            validator
                .param("clientId", "request params should provide client id")
                .isInt()
        ]
    }

    public static validateUsernames() {
        return [
            validator
                .check("usernames", "request body should contain usernames")
                .isArray()
                .notEmpty()
        ]
    }

    public static validateUsername() {
        return [
            validator
                .check("username", "request body should contain username")
                .isString()
                .notEmpty()
        ]
    }

    public static validateGroupId() {
        return [
            validator
                .check("groupId", "request body should contain group id")
                .isString()
                .notEmpty()
        ]

    }

    public static validateParsedAddition() {
        return [
            ...ClientValidator.validateGroupId(),
            ...ClientValidator.validateUsernames()
        ]
    }
}