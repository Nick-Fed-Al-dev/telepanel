import * as express from "express"

import {RefreshTokenService} from "../../core/refresh-token/refresh-token.service"
import {ApiError} from "../ApiError"
import {RequestExtended} from "../types/RequestExtended"

export const authMiddleware = () : any => {

    return (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {

            const accessToken = req.headers?.authorization?.split(" ")[1]

            const payloadUserDto = RefreshTokenService.validateAccessToken(accessToken)

            if(!accessToken || !payloadUserDto) {
                ApiError.unauthorized()
            }

            if(!payloadUserDto.isActivated) {
                ApiError.noAccess("account is not activated")
            }

            req.user = payloadUserDto

            next()

        } catch (error : any) {
            next(error)
        }
    }
}