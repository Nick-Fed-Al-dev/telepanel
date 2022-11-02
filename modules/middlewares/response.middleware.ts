import * as express from "express"

import {ApiError} from "../ApiError"
import {logger} from "../logger"
import {HttpStatus} from "../HttpStatus"
import {ApiResponse} from "../ApiResponse"
import {ErrorHandler} from "../ErrorHandler"
import {RequestExtended} from "../types/RequestExtended"

export const responseMiddleware = () => {

    return async (data : any, req : RequestExtended, res : express.Response, next : express.NextFunction) => {

        if(data instanceof Error) {
            logger.error(data.message)

            await ErrorHandler.handle(data.message, req)

            if(data instanceof ApiError) {
                return res.status(data.code).json(data)
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "internal server error",
                error: data
            })
        }

        if(data instanceof ApiResponse) {

            return res.status(data.code).json(data)
        }

        next()
    }
}