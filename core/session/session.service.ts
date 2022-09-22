import {EntitySessionDto} from "./dto/entity-session.dto"
import {SessionEntity} from "./session.entity"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient";
import {ApiError} from "../../modules/ApiError";

export class SessionService {

    public static async getSession(accountId : number) : Promise<EntitySessionDto> {
        const sessionEntity = await SessionEntity.findOneBy({accountId})

        if(!sessionEntity) {
            ApiError.notFound("no account session found")
        }

        const entitySessionDto = new EntitySessionDto(sessionEntity)
        return entitySessionDto
    }

    public static async saveSession(phone : string, code : number) : Promise<EntitySessionDto> {
        const createSessionDto = await ApiTelegramClient.getSessionData(phone, code)
        const sessionEntity = await SessionEntity.create(createSessionDto as unknown as SessionEntity)
        await sessionEntity.save()
        const entitySessionDto = new EntitySessionDto(sessionEntity)
        return entitySessionDto
    }

}