import * as telegram from "telegram"
import {BigInteger} from "big-integer"

import {config} from "./config/config"
import {CreateSessionDto} from "../core/session/dto/create-session.dto"
import {DataAccountDto} from "../core/account/dto/data-account.dto";


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

        await client.invoke(new telegram.Api.auth.SendCode({
            phoneNumber: phone,
            apiId: Number(config.TELEGRAM_API_ID),
            apiHash: config.TELEGRAM_API_HASH,
            settings: new telegram.Api.CodeSettings({
                allowFlashcall: true,
                currentNumber: true,
                allowAppHash: true,
                allowMissedCall: true,
            }),
        }))
    }


    public static async getSessionData(phone : string, code : number) {
        const client = await ApiTelegramClient.connectClient()

        await client.invoke(new telegram.Api.auth.SignIn({
            phoneNumber: phone,
            phoneCode: String(code)
        }))

        const sessionData = await client.invoke(new telegram.Api.auth.ExportAuthorization({}))

        const createSessionDto = new CreateSessionDto(sessionData)

        return createSessionDto
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

    public async test() {
        await this.telegramClient.sendMessage("Svetlana_f_ko", {message: "Привет"})
    }

    // public async getThisAccountData() : Promise<DataAccountDto> {
    //     const thisAccount = await this.telegramClient.getMe()
    //
    //     telegram.Api.
    // }

}