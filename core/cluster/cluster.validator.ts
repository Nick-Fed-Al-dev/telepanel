import * as validator from "express-validator"

export class ClusterValidator {

    public static validateClusterIdParam() {
        return [
            validator.param("clusterId", "request should contain cluster id in params")
                .isInt()
        ]
    }

    public static validateClusterTitle() {
        return [
            validator.check("title", "request should contain cluster title in body")
                .isString()
                .notEmpty()
        ]
    }

    public static validateClusterUpdation() {
        return [
            ...ClusterValidator.validateClusterIdParam(),
            ...ClusterValidator.validateClusterTitle()
        ]
    }

}