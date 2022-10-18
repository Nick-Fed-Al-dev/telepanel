import {ClientEntity} from "./client.entity"
import {EntityClientDto} from "./dto/entity-client.dto"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {raw} from "express";
import {GroupEntity} from "../group/group.entity";

export class ClientService {

    public static async getClients(clusterId : number) {
        const clientEntityArray = await ClientEntity.findBy({clusterId})

        const entityClientDtoArray = clientEntityArray.map((clientEntity) => new EntityClientDto(clientEntity))

        return entityClientDtoArray
    }

    public static async getClient(clientId : number) {
        const clientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(clientEntity)

        return entityClientDto
    }

    public static async refreshClient(telegramClient : ApiTelegramClient, clientId : number) {

        const clientEntity = await ClientEntity.findOneBy({id: clientId})

        const dataClientDto = await telegramClient.parseAccount(clientEntity.username)

        const remainingGroups = []

        for(const groupId of clientEntity.groups) {

            const groupEntity = await GroupEntity.findOneBy({id: groupId})

            const isBelong = await telegramClient.checkGroupBelonging(groupEntity.telegramId, clientEntity.username)

            if(isBelong) {
                remainingGroups.push(groupId)
            }

        }

        dataClientDto.groups = remainingGroups

        await ClientEntity.update({id: clientId}, dataClientDto)

        const updatedClientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(updatedClientEntity)

        return entityClientDto
    }

    public static async refreshClients(telegramClient : ApiTelegramClient, clusterId : number) {

        const clientEntityArray = await ClientEntity.findBy({clusterId})

        const entityClientDtoArray = []

        for(const clientEntity of clientEntityArray) {

            const entityClientDto = await ClientService.refreshClient(telegramClient, clientEntity.id)

            entityClientDtoArray.push(entityClientDto)
        }

        return entityClientDtoArray

    }

    public static async updateClient(clientId : number, update : any) {

        await ClientEntity.update({id: clientId}, update)

        const clientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(clientEntity)

        return entityClientDto

    }
}