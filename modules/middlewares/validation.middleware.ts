import * as express from "express"

import {ApiError} from "../ApiError"

export const validationMiddleware = () => {

    return (req : express.Request, res : express.Response, next : express.NextFunction) => {
        try {
            ApiError.validateRequest(req)
        } catch (error : any) {
            next(error)
        }

    }
}