import {UpdateTariffDto} from "./dto/update-tariff.dto"
import {TariffEntity} from "./tariff.entity"
import {EntityTariffDto} from "./dto/entity-tariff.dto"
import {CreateTariffDto} from "./dto/create-tariff.dto"

export class TariffService {

    public static async getTariff(userId : number) : Promise<EntityTariffDto> {
        const tariffEntity = await TariffEntity.findOneBy({userId})
        const entityTariffDto = new EntityTariffDto(tariffEntity)
        return entityTariffDto
    }

    public static async createTariff(createTariffDto : CreateTariffDto) : Promise<EntityTariffDto> {
        const tariffEntity = TariffEntity.create(createTariffDto as unknown as TariffEntity)
        await tariffEntity.save()
        const entityTariffDto = new EntityTariffDto(tariffEntity)
        return entityTariffDto
    }

    public static async updateTariff(userId : number, updateTariffDto : UpdateTariffDto) : Promise<EntityTariffDto> {
        const tariffEntity = await TariffEntity.update({userId}, updateTariffDto)
        const entityTariffDto = new EntityTariffDto(tariffEntity)
        return entityTariffDto
    }
}