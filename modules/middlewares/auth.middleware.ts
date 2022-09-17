import * as express from "express"

import {RefreshTokenService} from "../../core/refreshToken/refresh-token.service"
import {ApiError} from "../ApiError"

export const authMiddleware = () => {

    return (req : express.Request, res : express.Response & any, next : express.NextFunction) => {
        try {

            const accessToken = req.headers?.authorization?.split(" ")[1]

            const payloadUserDto = RefreshTokenService.validateAccessToken(accessToken)

            if(!accessToken || !payloadUserDto) {
                ApiError.unauthorized()
            }

            res.user = payloadUserDto

            next()

        } catch (error : any) {
            next(error)
        }
    }
}