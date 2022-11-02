import {EntityFloodDto} from "./dto/entity-flood.dto"
import {FloodEntity} from "./flood.entity"
import {AccountService} from "../account/account.service";
import {Time} from "../../modules/Time";

export class FloodService {

    public static async getFlood(accountId : number) : Promise<EntityFloodDto> {

        const floodEntity = await FloodEntity.findOneBy({accountId})

        const entityFloodDto = new EntityFloodDto(floodEntity)

        return entityFloodDto
    }

    public static async createFlood(accountId : number) : Promise<EntityFloodDto> {

        const floodEntity = new FloodEntity()

        floodEntity.accountId = accountId

        await floodEntity.save()

        const entityFloodDto = new EntityFloodDto(floodEntity)

        return entityFloodDto
    }

    public static async refreshFlood(accountId : number, periodSeconds : number) : Promise<EntityFloodDto> {

        await FloodEntity.update({accountId}, {expiresIn: periodSeconds})

        const floodEntity = await FloodEntity.findOneBy({accountId})

        const entityFloodDto = new EntityFloodDto(floodEntity)

        return entityFloodDto
    }

    public static async updateFloods(userId : number) {

        const accountEntityArray = await AccountService.getAccounts(userId)

        const entityFloodDtoArray = []

        for(const accountEntity of accountEntityArray) {

            const floodEntity = await FloodEntity.findOneBy({accountId: accountEntity.id})

            const now = new Date()
            const lastUpdate = new Date(floodEntity.updatedAt)

            const dayDifference = Time.datesDifferenceInDays(lastUpdate, now)

            if(!dayDifference) {

                const entityFloodDto = new EntityFloodDto(floodEntity)

                entityFloodDtoArray.push(entityFloodDto)

            }

            const expiresInDifference = floodEntity.expiresIn - dayDifference

            floodEntity.expiresIn = expiresInDifference

            if(expiresInDifference < 0) {
                floodEntity.expiresIn = 0
            }

            floodEntity.updatedAt = now

            await floodEntity.save()

            const entityFloodDto = new EntityFloodDto(floodEntity)

            entityFloodDtoArray.push(entityFloodDto)
        }

        return entityFloodDtoArray
    }

    public static async removeFlood(accountId : number) {

        await FloodEntity.delete({accountId})

    }

}