import * as express from "express"
import * as validator from "express-validator"
import {HttpStatus} from "./HttpStatus"

export class ApiError extends Error {
    public message : string
    public code : number

    constructor(message : string, code : number) {
        super()
        this.message = message
        this.code = code
    }

    static badRequest(message = "bad request") {
        throw new ApiError(message, HttpStatus.BAD_REQUEST)
    }

    static unauthorized(message = "unauthorized") {
        throw new ApiError(message, HttpStatus.UNAUTHORIZED)
    }

    static notFound(message = "not found") {
        throw new ApiError(message, HttpStatus.NOT_FOUND)
    }

    static validateRequest(req : express.Request) {
        const result = validator.validationResult(req)

        if(!result.isEmpty()) {
            ApiError.badRequest(result.array()[0].msg)
        }
    }
}