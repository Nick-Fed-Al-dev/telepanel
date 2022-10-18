import * as telegram from "telegram"

import {config} from "./config/config"
import {AuthAccountDto} from "../core/account/dto/auth-account.dto"
import {DataAccountDto} from "../core/account/dto/data-account.dto"
import {DataClientDto} from "../core/client/dto/data-client.dto"
import {DataGroupDto} from "../core/group/dto/data-group.dto";

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

    public async parseAccount(username : string) : Promise<DataClientDto> {
        const fullAccount : telegram.Api.users.UserFull = await this.telegramClient.invoke(new telegram.Api.users.GetFullUser({id: username}))

        const dataClientDto = new DataClientDto({
            bio: fullAccount.fullUser.about,
            username
        })

        return dataClientDto
    }

    public async searchGroups(title : string) {

        const found = (await this.telegramClient.invoke(new telegram.Api.contacts.Search({
            q: title,
            limit: 10
        }))).results as telegram.Api.PeerChat[]

        const groupIdArray = found.map((group) => String(group.chatId))

        return groupIdArray
    }

    public async parseGroup(telegramId : string) {

        const fullGroup = await this.telegramClient.invoke(new telegram.Api.channels.GetFullChannel({
            channel: telegramId
        })) as unknown as telegram.Api.ChatFull

        const group = (await this.telegramClient.invoke(new telegram.Api.channels.GetChannels({
            id: [telegramId]
        }))).chats[0] as telegram.Api.Chat

        const dataGroupDto = new DataGroupDto({
            telegramId,
            description: fullGroup.about,
            title: group.title,
            population: group.participantsCount
        })

        return dataGroupDto
    }

    public async parseGroupMembers(telegramId : string, offset : number) {

        const members = (await this.telegramClient.invoke(new telegram.Api.channels.GetParticipants({
            limit: 100,
            channel: telegramId,
            offset
        }))) as telegram.Api.channels.ChannelParticipants

        const memberIdArray = members.participants.map((participant) => {
            return String((participant as unknown as telegram.Api.ChannelParticipant).userId)
        })

        return memberIdArray
    }

    public async checkGroupBelonging(groupId : string, username : string) {

        const isBelong = await this.telegramClient.invoke(new telegram.Api.channels.CheckUsername({
            channel: groupId,
            username
        }))

        return isBelong
    }

    public async test() {
        await this.telegramClient.sendMessage("Svetlana_f_ko", {message: "Привет!!!"})
    }

}