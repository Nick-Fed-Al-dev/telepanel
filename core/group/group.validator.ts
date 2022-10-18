import * as validator from "express-validator"

export class GroupValidator {

    public static validateGroupIdParam() {
        return [
            validator
                .param("groupId", "request params should provide group id")
                .isInt()
        ]
    }

    public static validateClusterIdParam() {
        return [
            validator
                .param("clusterId", "request params should provide cluster id")
                .isInt()
        ]
    }

    public static validateAccountId() {
        return [
            validator
                .check("accountId", "request body should contain account id")
                .isInt()
        ]
    }

    public static validateGroupTitle() {
        return [
            validator
                .check("title", "request body should contain group title")
                .isString()
                .notEmpty()
        ]
    }

    public static validateTelegramId() {
        return [
            validator
                .check("telegramId", "request body should contain telegram id")
                .isString()
                .notEmpty()
        ]
    }

    public static validateGroupRefreshAll() {
        return [
            ...GroupValidator.validateClusterIdParam(),
            ...GroupValidator.validateAccountId()
        ]
    }

    public static validateGroupRefresh() {
        return [
            ...GroupValidator.validateGroupIdParam(),
            ...GroupValidator.validateAccountId()
        ]
    }

    public static validateGroupAddition() {
        return [
            ...GroupValidator.validateClusterIdParam(),
            ...GroupValidator.validateTelegramId()
        ]
    }

    public static validateGroupSearch() {
        return [
            ...GroupValidator.validateAccountId(),
            ...GroupValidator.validateGroupTitle()
        ]
    }

    public static validateGroupParse() {
        return [
            ...GroupValidator.validateAccountId(),
            ...GroupValidator.validateGroupIdParam()
        ]
    }

}