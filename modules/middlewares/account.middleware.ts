import * as express from "express"
import {BigInteger} from "big-integer"

import {RequestExtended} from "../types/RequestExtended"
import {ApiTelegramClient} from "../ApiTelegramClient"
import {SessionService} from "../../core/session/session.service"

export const accountMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {

            const body : {accountId : number} = req.body

            const entitySessionDto = await SessionService.getSession(body.accountId)

            const telegramClient = await ApiTelegramClient.login(entitySessionDto.sessionName)

            req.telegramClient = telegramClient

            next()

        } catch (error : any) {
            next(error)
        }
    }
}