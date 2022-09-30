import * as telegram from "telegram"
import {BigInteger} from "big-integer"

import {config} from "./config/config"
import {DataSessionDto} from "../core/session/dto/data-session.dto"
import {AuthAccountDto} from "../core/account/dto/auth-account.dto"
import {DataAccountDto} from "../core/account/dto/data-account.dto"

export class ApiTelegramClient {

    public telegramClient : telegram.TelegramClient

    constructor(client : telegram.TelegramClient) {
        this.telegramClient = client
    }

    private static async connectClient() {
        const session = new telegram.sessions.StringSession("")
        const client = new telegram.TelegramClient(session, Number(config.TELEGRAM_API_ID), config.TELEGRAM_API_HASH, {})

        await client.connect()

        return client
    }

    public static async sendCode(phone : string) {
        const client = await ApiTelegramClient.connectClient()

        const {phoneCodeHash} = await client.invoke(new telegram.Api.auth.SendCode({
            phoneNumber: phone,
            apiId: Number(config.TELEGRAM_API_ID),
            apiHash: config.TELEGRAM_API_HASH,
            settings: new telegram.Api.CodeSettings({}),

        }))

        return {
            codeHash: phoneCodeHash,
            client
        }
    }

    public static async extractSessionData(authAccountDto : AuthAccountDto) {

        await authAccountDto.client.invoke(new telegram.Api.auth.SignIn({
            phoneNumber: authAccountDto.phone,
            phoneCode: String(authAccountDto.code),
            phoneCodeHash: authAccountDto.codeHash
        }))

        const auth = await authAccountDto.client.invoke(new telegram.Api.auth.ExportAuthorization({}))
        const dataSessionDto = new DataSessionDto(auth)

        return dataSessionDto
    }

    public static async importSession(key : BigInteger, bytes: Buffer) {
        const client = await ApiTelegramClient.connectClient()

        await client.invoke(new telegram.Api.auth.ImportAuthorization({
            id: key,
            bytes
        }))

        const apiTelegramClient = new ApiTelegramClient(client)

        return apiTelegramClient
    }

    public async getThisAccountData() : Promise<DataAccountDto> {
        const thisAccount = await this.telegramClient.getMe() as telegram.Api.User

        const dataAccountDto = new DataAccountDto(thisAccount)

        return dataAccountDto
    }

    public async test() {
        await this.telegramClient.sendMessage("nickfedev", {message: "Привет!!!"})
    }

}