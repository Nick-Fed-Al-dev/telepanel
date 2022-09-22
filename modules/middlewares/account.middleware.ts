import * as express from "express"

import {RequestExtended} from "../types/RequestExtended"
import {SessionService} from "../../core/session/session.service"
import {ApiTelegramClient} from "../ApiTelegramClient"
import {BigInteger} from "big-integer"
import {ApiError} from "../ApiError"

export const accountMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {
            const body : {accountId : number} = req.body

            if(!body.accountId) {
                ApiError.badRequest("request should contain account id")
            }

            const sessionEntityDto = await SessionService.getSession(body.accountId)

            const telegramClient = await ApiTelegramClient.importSession(sessionEntityDto.key as unknown as BigInteger, sessionEntityDto.bytes)

            req.telegramClient = telegramClient

            next()
        } catch (error : any) {
            next(error)
        }
    }
}