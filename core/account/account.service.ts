import {AccountEntity} from "./account.entity"
import {EntityAccountDto} from "./dto/entity-account.dto"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {AuthAccountDto} from "./dto/auth-account.dto"
import {SessionService} from "../session/session.service"
import {CreateSessionDto} from "../session/dto/create-session.dto"
import {SessionEntity} from "../session/session.entity"

export class AccountService {

    public static async getAccounts(userId : number) : Promise<EntityAccountDto[]> {

        const accountEntityDtoArray = await AccountEntity.findBy({userId})

        const entityAccountDtoArray = accountEntityDtoArray.map((accountEntity) => {
            return new EntityAccountDto(accountEntity)
        })

        return entityAccountDtoArray
    }

    public static async createAccount(userId : number, phone : string) {

        const accountEntity = new AccountEntity()

        accountEntity.userId = userId
        accountEntity.phone = phone

        await accountEntity.save()

        const entityAccountDto = new EntityAccountDto(accountEntity)

        return entityAccountDto
    }

    public static async sendCode(accountId : number) {

        const accountEntity = await AccountEntity.findOneBy({id: accountId})
        const {codeHash, client} = await ApiTelegramClient.sendCode(accountEntity.phone)

        return {codeHash, client, phone: accountEntity.phone}
    }

    public static async loginAccount(authAccountDto : AuthAccountDto) {

        const accountEntity = await AccountEntity.findOneBy({phone: authAccountDto.phone})
        const sessionName = await ApiTelegramClient.getSessionName(authAccountDto)

        const createSessionDto = new CreateSessionDto({accountId: accountEntity.id, sessionName})

        await SessionService.saveSession(createSessionDto)

        const telegramClient = await ApiTelegramClient.login(sessionName)
        const dataAccountDto = await telegramClient.getSelfData()

        await AccountEntity.update({id: accountEntity.id}, dataAccountDto)

        const updatedAccountEntity = await AccountEntity.findOneBy({id: accountEntity.id})

        const entityAccountDto = new EntityAccountDto(updatedAccountEntity)

        return entityAccountDto
    }

    public static async refreshAccount(accountId : number) {
        const sessionEntity = await SessionEntity.findOneBy({accountId})

        const telegramClient = await ApiTelegramClient.login(sessionEntity.sessionName)
        const dataAccountDto = await telegramClient.getSelfData()

        await AccountEntity.update({id: accountId}, dataAccountDto)

        const accountEntity = await AccountEntity.findOneBy({id: accountId})

        const entityAccountDto = new EntityAccountDto(accountEntity)

        return entityAccountDto
    }

}