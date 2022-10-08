import * as express from "express"

import {AccountService} from "./account.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {CreateAccountDto} from "./dto/create-account.dto"
import {RequestExtended} from "../../modules/types/RequestExtended"
import {AuthAccountDto} from "./dto/auth-account.dto"
import {serverStorage} from "../../modules/storage/server-storage"
import {LoginAccountDto} from "./dto/login-account.dto"
import {accountKeyCreator} from "../../modules/storage/account-key-creator"
import {ApiError} from "../../modules/ApiError"

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
            ApiError.validateRequest(req)

            const userId = req.user.id
            const body = new CreateAccountDto(req.body)

            const entityAccountDto = await AccountService.createAccount(userId, body.phone)

            const response = ApiResponse.created("account created", entityAccountDto)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async sendCode(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const accountId = Number(req.params.accountId)

            const {client, phone, codeHash} = await AccountService.sendCode(accountId)

            const authAccountDto = new AuthAccountDto({client, phone, codeHash})

            serverStorage.set(accountKeyCreator(accountId), authAccountDto)

            const response = ApiResponse.ok("code sent")

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async loginAccount(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const accountId = Number(req.params.accountId)
            const {code} = new LoginAccountDto(req.body)

            const authAccountDto = new AuthAccountDto(serverStorage.get(accountKeyCreator(accountId)))

            authAccountDto.code = code

            const entityAccountDto = await AccountService.loginAccount(authAccountDto)

            serverStorage.delete(accountKeyCreator(accountId))

            const response = ApiResponse.created("account authorized", entityAccountDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

}