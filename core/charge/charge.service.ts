import {ChargeEntity} from "./charge.entity"
import {TariffEntity} from "../tariff/tariff.entity"
import {EntityChargeDto} from "./dto/entity-charge.dto";
import {CreateChargeDto} from "./dto/create-charge.dto";
import {Time} from "../../modules/Time";

export class ChargeService {

    public static async getCharge(userId : number) {
        const tariffEntity = await TariffEntity.findOneBy({userId})
        const chargeEntity = await ChargeEntity.findOneBy({tariffId: tariffEntity.id})

        const entityChargeDto = new EntityChargeDto(chargeEntity)

        return entityChargeDto
    }

    public static async createCharge(userId : number) {
        const tariffEntity = await TariffEntity.findOneBy({userId})
        const createChargeDto = new CreateChargeDto({tariffId: tariffEntity.id, expiresIn: tariffEntity.period})

        const chargeEntity = ChargeEntity.create(createChargeDto as unknown as ChargeEntity)
        await chargeEntity.save()

        const entityChargeDto = new EntityChargeDto(chargeEntity)

        return entityChargeDto
    }

    public static async recharge(userId : number) {
        const tariffEntity = await TariffEntity.findOneBy({userId})
        const chargeEntity = await ChargeEntity.findOneBy({tariffId: tariffEntity.id})

        chargeEntity.expiresIn = tariffEntity.period
        await chargeEntity.save()

        const entityChargeDto = new EntityChargeDto(chargeEntity)

        return entityChargeDto
    }

    public static async updateCharge(userId : number) {
        const tariffEntity = await TariffEntity.findOneBy({userId})
        const chargeEntity = await ChargeEntity.findOneBy({tariffId: tariffEntity.id})

        const lastUpdate = new Date(chargeEntity.updatedAt)
        const now = new Date()

        const dayDifference = Time.datesDifferenceInDays(lastUpdate, now)

        const expiresIn = chargeEntity.expiresIn - dayDifference

        chargeEntity.expiresIn = (expiresIn > 0) ? expiresIn : 0

        await chargeEntity.save()

        const entityChargeDto = new EntityChargeDto(chargeEntity)

        return entityChargeDto
    }

}