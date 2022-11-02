import {AccountEntity} from "./account.entity"
import {EntityAccountDto} from "./dto/entity-account.dto"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {AuthAccountDto} from "./dto/auth-account.dto"
import {SessionService} from "../session/session.service"
import {CreateSessionDto} from "../session/dto/create-session.dto"
import {FullAccountDto} from "./dto/full-account.dto"
import {AccountDataService} from "../account-data/account-data.service"
import {FloodService} from "../flood/flood.service"
import {ApiError} from "../../modules/ApiError"
import {EntityFloodDto} from "../flood/dto/entity-flood.dto"

export class AccountService {

    public static async getAccounts(userId : number) : Promise<FullAccountDto[]> {

        const accountEntityArray = await AccountEntity.findBy({userId})

        const fullAccountDtoArray = []

        for(const accountEntity of accountEntityArray) {

            const entityAccountDto = new EntityAccountDto(accountEntity)

            const entityAccountDataDto = await AccountDataService.getAccountData(accountEntity.id)

            const entityFloodDto = await FloodService.getFlood(accountEntity.id)

            const fullAccountDto = new FullAccountDto({
                ...entityAccountDto,
                flood: entityFloodDto,
                data: entityAccountDataDto
            })

            fullAccountDtoArray.push(fullAccountDto)
        }

        return fullAccountDtoArray
    }

    public static async getAccount(accountId : number) : Promise<FullAccountDto> {

        const accountEntity = await AccountEntity.findOneBy({id: accountId})

        const entityAccountDto = new EntityAccountDto(accountEntity)

        const entityAccountDataDto = await AccountDataService.getAccountData(accountId)

        const entityFloodDto = await FloodService.getFlood(accountId)

        const fullAccountDto = new FullAccountDto({
            ...entityAccountDto,
            flood: entityFloodDto,
            data: entityAccountDataDto
        })

        return fullAccountDto
    }

    public static async createAccount(userId : number, phone : string) {

        const accountEntity = new AccountEntity()

        accountEntity.userId = userId
        accountEntity.phone = phone

        await accountEntity.save()

        const entityAccountDataDto = await AccountDataService.createAccountData(accountEntity.id)

        const entityFloodDto = await FloodService.createFlood(accountEntity.id)

        const entityAccountDto = new EntityAccountDto(accountEntity)

        const fullAccountDto = new FullAccountDto({
            ...entityAccountDto,
            flood: entityFloodDto,
            data: entityAccountDataDto
        })

        return fullAccountDto
    }

    public static async sendCode(accountId : number) {

        const accountEntity = await AccountEntity.findOneBy({id: accountId})

        const entityFloodDto = await FloodService.getFlood(accountId)

        if(entityFloodDto.expiresIn > 0) {
            ApiError.noAccess("flood")
        }

        const {codeHash, client} = await ApiTelegramClient.sendCode(accountEntity.phone)

        return {codeHash, client, phone: accountEntity.phone}
    }

    public static async loginAccount(authAccountDto : AuthAccountDto) {

        const accountEntity = await AccountEntity.findOneBy({phone: authAccountDto.phone})

        const entityFloodDto = await FloodService.getFlood(accountEntity.id)

        if(entityFloodDto.expiresIn > 0) {
            ApiError.noAccess("flood")
        }

        const sessionName = await ApiTelegramClient.getSessionName(authAccountDto)

        const createSessionDto = new CreateSessionDto({accountId: accountEntity.id, sessionName})

        await SessionService.saveSession(createSessionDto)

        accountEntity.isAuthorized = true

        const entityAccountDto = new EntityAccountDto(accountEntity)

        const entityAccountDataDto = await AccountDataService.refreshAccountData(accountEntity.id)

        const fullAccountDto = new FullAccountDto({
            ...entityAccountDto,
            flood: entityFloodDto,
            data: entityAccountDataDto
        })

        return fullAccountDto
    }

    public static async refreshAccount(accountId : number) {

        const entityAccountDataDto = await AccountDataService.refreshAccountData(accountId)

        const accountEntity = await AccountEntity.findOneBy({id: accountId})

        const floodEntity = await FloodService.getFlood(accountId)

        const entityAccountDto = new EntityAccountDto(accountEntity)

        const entityFloodDto = new EntityFloodDto(floodEntity)

        const fullAccountDto = new FullAccountDto({
            ...entityAccountDto,
            flood: entityFloodDto,
            data: entityAccountDataDto
        })

        return fullAccountDto
    }

    public static async authorizeClient(accountId : number) {

        const entitySessionDto = await SessionService.getSession(accountId)

        const telegramClient = await ApiTelegramClient.login(entitySessionDto.sessionName)

        return telegramClient
    }

}