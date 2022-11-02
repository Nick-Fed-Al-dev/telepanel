import * as validator from "express-validator"

export class TagValidator {

    public static validateTagIdParam() {

        return [
            validator
                .param("tagId", "request should provide tag id in params")
                .isInt()
        ]
    }

    public static validateTagName() {

        return [
            validator
                .check("name", "request body should contain tag name")
                .isString()
                .notEmpty()
        ]
    }

    public static validateTagDescription() {

        return [
            validator
                .check("description", "request body should contain tag description")
                .isString()
        ]
    }

    public static validateTagAddition() {

        return [
            ...TagValidator.validateTagIdParam(),
            ...TagValidator.validateTagName(),
            ...TagValidator.validateTagDescription()
        ]
    }

}