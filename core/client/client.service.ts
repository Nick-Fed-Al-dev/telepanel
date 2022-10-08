import * as express from "express"

import {ClientEntity} from "./client.entity"
import {EntityClientDto} from "./dto/entity-client.dto"
import {ApiTelegramClient} from "../../modules/ApiTelegramClient"

export class ClientService {

    public static async getClients(userId : number) {
        const clientEntityArray = await ClientEntity.findBy({userId})

        const entityClientDtoArray = clientEntityArray.map((clientEntity) => new EntityClientDto(clientEntity))

        return entityClientDtoArray
    }

    public static async getClient(clientId : number) {
        const clientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(clientEntity)

        return entityClientDto
    }

    public static async saveClient(client : ApiTelegramClient, userId : number, username : string) : Promise<EntityClientDto> {
        const dataClientDto = await client.parseAccount(username)

        const clientEntity = ClientEntity.create({...dataClientDto, userId})
        await clientEntity.save()

        const entityClientDto = new EntityClientDto(clientEntity)

        return entityClientDto
    }

    public static async saveParsedClients(client : ApiTelegramClient, userId : number, usernames : string[], groupId : string) : Promise<EntityClientDto[]> {
        const dataClientDtoArray = await client.parseAccounts(usernames)
        const entityClientDtoArray = []
        for(const dataClientDto of dataClientDtoArray) {
            const clientEntity = ClientEntity.create({...dataClientDto, userId, from: groupId})
            await clientEntity.save()
            const entityClientDto = new EntityClientDto(clientEntity)
            entityClientDtoArray.push(entityClientDto)
        }

        return entityClientDtoArray

    }

    public static async refreshClients(client : ApiTelegramClient, userId : number) : Promise<EntityClientDto[]> {

        const clientEntities = await ClientEntity.findBy({userId})
        const usernames = clientEntities.map((clientEntity) => clientEntity.username)

        const dataClientDtoArray = await client.parseAccounts(usernames)
        const entityClientDtoArray = []

        for(const dataClientDto of dataClientDtoArray) {
            await ClientEntity.update({username: dataClientDto.username}, dataClientDto)
            const clientEntity = await ClientEntity.findOneBy({username: dataClientDto.username})
            const entityClientDto = new EntityClientDto(clientEntity)
            entityClientDtoArray.push(entityClientDto)
        }

        return entityClientDtoArray
    }

    public static async refreshClient(client : ApiTelegramClient, clientId : number) {
        const clientEntity = await ClientEntity.findOneBy({id: clientId})
        const username = clientEntity.username

        const dataClientDto = await client.parseAccount(username)

        await ClientEntity.update({id: clientId}, dataClientDto)

        const updatedClientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(updatedClientEntity)

        return entityClientDto
    }

    public static async removeClient(clientId : number) {
        await ClientEntity.delete({id: clientId})
    }

}