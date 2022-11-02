import {EntityAccountDataDto} from "./dto/entity-account-data.dto"
import {AccountDataEntity} from "./account-data.entity"
import {AccountService} from "../account/account.service"

export class AccountDataService {

    public static async getAccountData(accountId : number) : Promise<EntityAccountDataDto> {

        const accountDataEntity = await AccountDataEntity.findOneBy({accountId})

        const entityAccountDataDto = new EntityAccountDataDto(accountDataEntity)

        return entityAccountDataDto
    }

    public static async createAccountData(accountId : number) : Promise<EntityAccountDataDto> {

        const accountDataEntity = new AccountDataEntity()

        accountDataEntity.accountId = accountId

        await accountDataEntity.save()

        const entityAccountDataDto = new EntityAccountDataDto(accountDataEntity)

        return entityAccountDataDto
    }

    public static async refreshAccountData(accountId : number) : Promise<EntityAccountDataDto> {

        const telegramClient = await AccountService.authorizeClient(accountId)

        const dataAccountDataDto = await telegramClient.getSelfData()

        await AccountDataEntity.update({accountId}, dataAccountDataDto)

        const accountDataEntity = await AccountDataEntity.findOneBy({accountId})

        const entityAccountDataDto = new EntityAccountDataDto(accountDataEntity)

        return entityAccountDataDto
    }

    public static async removeAccountData(accountId : number) {

        await AccountDataEntity.delete({accountId})

    }

}