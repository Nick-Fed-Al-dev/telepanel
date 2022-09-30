import * as express from "express"

import {AccountService} from "./account.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {CreateAccountDto} from "./dto/create-account.dto"
import {RequestExtended} from "../../modules/types/RequestExtended"

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

    public static async createAccount(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id
            const body = new CreateAccountDto(req.body)

            const entityAccountDto = await AccountService.createAccount(userId, body.phone)

            const response = ApiResponse.created("account created", entityAccountDto)

            next(response)

        } catch(error : any) {
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