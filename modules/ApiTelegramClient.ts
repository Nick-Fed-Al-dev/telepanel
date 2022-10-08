import * as telegram from "telegram"

import {config} from "./config/config"
import {AuthAccountDto} from "../core/account/dto/auth-account.dto"
import {DataAccountDto} from "../core/account/dto/data-account.dto"
import {DataClientDto} from "../core/client/dto/data-client.dto";

export class ApiTelegramClient {

    public telegramClient : telegram.TelegramClient

    constructor(client : telegram.TelegramClient) {
        this.telegramClient = client
    }

    private static async connectClient(sessionName : string) {
        const session = new telegram.sessions.StringSession(sessionName)

        const client = new telegram.TelegramClient(session, Number(config.TELEGRAM_API_ID), config.TELEGRAM_API_HASH, {
            connectionRetries: 5
        })

        await client.connect()

        return client
    }

    public static async sendCode(phone : string) {
        const client = await ApiTelegramClient.connectClient("")

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

    public static async getSessionName(authAccountDto : AuthAccountDto) {

        await authAccountDto.client.invoke(new telegram.Api.auth.SignIn({
            phoneNumber: authAccountDto.phone,
            phoneCode: String(authAccountDto.code),
            phoneCodeHash: authAccountDto.codeHash
        }))

        const sessionName = String(authAccountDto.client.session.save())

        return sessionName
    }

    public static async login(sessionName : string) {
        const client = await ApiTelegramClient.connectClient(sessionName)

        const apiTelegramClient = new ApiTelegramClient(client)

        return apiTelegramClient
    }

    public async getSelfData() : Promise<DataAccountDto> {
        const me = await this.telegramClient.getMe() as telegram.Api.User

        const fullAccount : telegram.Api.users.UserFull = await this.telegramClient.invoke(new telegram.Api.users.GetFullUser({id: me.username}))

        const dataAccountDto = new DataAccountDto({...me, bio: fullAccount.fullUser.about})

        return dataAccountDto
    }

    public async parseAccounts(usernames : string[]) : Promise<DataClientDto[]> {

        const dataClientDtoArray = []
        console.log(usernames)
        for (const username of usernames) {
            const fullAccount : telegram.Api.users.UserFull = await this.telegramClient.invoke(new telegram.Api.users.GetFullUser({id: username}))
            const dataClientDto = new DataClientDto({
                bio: fullAccount.fullUser.about,
                photo: fullAccount.fullUser.profilePhoto,
                username
            })
            dataClientDtoArray.push(dataClientDto)
        }

        return dataClientDtoArray
    }

    public async parseAccount(username : string) : Promise<DataClientDto> {
        const fullAccount : telegram.Api.users.UserFull = await this.telegramClient.invoke(new telegram.Api.users.GetFullUser({id: username}))

        const dataClientDto = new DataClientDto({
            bio: fullAccount.fullUser.about,
            photo: fullAccount.fullUser.profilePhoto,
            username
        })

        return dataClientDto
    }

    public async parseUsernames(groupTitles : string[]) : Promise<string[]> {
        return
    }

    public async test() {
        await this.telegramClient.sendMessage("Svetlana_f_ko", {message: "Привет!!!"})
    }

}