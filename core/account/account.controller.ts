import {RequestExtended} from "../../modules/types/RequestExtended"

import * as express from "express"
import {AccountService} from "./account.service";
import {ApiResponse} from "../../modules/ApiResponse";
import {SendCodeAccountDto} from "./dto/send-code-account.dto";
import {BindAccountDto} from "./dto/bind-account.dto";
import {SessionService} from "../session/session.service";


export class AccountController {

    public static async getAccounts(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const entityAccountDtoArray = await AccountService.getAccounts(userId)

            const response = ApiResponse.ok("accounts received", entityAccountDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async sendAccountCode(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const sendCodeAccountDto : SendCodeAccountDto = req.body

            await AccountService.sendCode(sendCodeAccountDto.phone)

            const response = ApiResponse.ok("message sent")

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async bindAccount(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const bindAccountDto : BindAccountDto = req.body
            const userId = req.user.id

            const accountEntity = await AccountService.bindAccount(bindAccountDto.phone, bindAccountDto.code, userId)

            const response = ApiResponse.created("session created", accountEntity)

            next(response)
        } catch (error : any) {
            next(error)
        }
    }

    public static async test(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            await req.telegramClient.test()
            const response = ApiResponse.ok("tested")
            next(response)
        } catch (error : any) {
            next(error)
        }
    }

}