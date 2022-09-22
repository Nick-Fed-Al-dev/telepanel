import {AccountEntity} from "./account.entity"
import {EntityAccountDto} from "./dto/entity-account.dto"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {SessionService} from "../session/session.service"
import {UserEntity} from "../user/user.entity";

export class AccountService {

    public static async getAccounts(userId : number) : Promise<EntityAccountDto[]> {
        const accountEntityDtoArray = await AccountEntity.findBy({userId})

        const entityAccountDtoArray = accountEntityDtoArray.map((accountEntity) => {
            return new EntityAccountDto(accountEntity)
        })

        return entityAccountDtoArray
    }

    public static async sendCode(phone : string) {
        await ApiTelegramClient.sendCode(phone)
    }

    public static async bindAccount(phone : string, code : number, userId : number) {
        const entitySessionDto = await SessionService.saveSession(phone, code)

        const accountEntity = new AccountEntity()

        accountEntity.userId = userId
        accountEntity.phone = phone

        await accountEntity.save()

        return accountEntity
    }

}