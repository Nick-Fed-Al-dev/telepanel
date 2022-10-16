import * as validator from "express-validator"

export class ClientValidator {

    public static validateClientIdParam() {
        return [
            validator
                .param("clientId", "request params should provide client id")
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
                .check("accountId", "request should contain account id")
                .isInt()
        ]
    }

    public static validateClientRefresh() {
        return [
            ...ClientValidator.validateClientIdParam(),
            ...ClientValidator.validateAccountId()
        ]
    }

}