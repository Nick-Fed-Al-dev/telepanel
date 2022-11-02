import {TelegramClient} from "telegram"

import {EntitySessionDto} from "./dto/entity-session.dto"
import {SessionEntity} from "./session.entity"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {ApiError} from "../../modules/ApiError"
import {CreateSessionDto} from "./dto/create-session.dto"
import {AccountEntity} from "../account/account.entity"
import {AuthAccountDto} from "../account/dto/auth-account.dto"

export class SessionService {

    public static async getSession(accountId : number) : Promise<EntitySessionDto> {
        const sessionEntity = await SessionEntity.findOneBy({accountId})

        if(!sessionEntity) {
            ApiError.notFound("no account session found")
        }

        const entitySessionDto = new EntitySessionDto(sessionEntity)
        return entitySessionDto
    }

    public static async saveSession(createSessionDto : CreateSessionDto) : Promise<EntitySessionDto> {

        const sessionEntity = await SessionEntity.findOneBy({accountId: createSessionDto.accountId})

        if(sessionEntity) {
            sessionEntity.sessionName = createSessionDto.sessionName

            await sessionEntity.save()

            const entitySessionDto = new EntitySessionDto(sessionEntity)

            return entitySessionDto
        }

        const newSessionEntity = await SessionEntity.create(createSessionDto as unknown as SessionEntity)
        await newSessionEntity.save()
        const entitySessionDto = new EntitySessionDto(newSessionEntity)
        return entitySessionDto
    }

}