import {ApiTelegramClient} from "../../modules/ApiTelegramClient"
import {GroupEntity} from "./group.entity"
import {EntityGroupDto} from "./dto/entity-group.dto"
import {ClientEntity} from "../client/client.entity"
import {EntityClientDto} from "../client/dto/entity-client.dto";

export class GroupService {

    public static async getGroup(groupId : number) {
        const groupEntity = await GroupEntity.findOneBy({id: groupId})

        const entityGroupDto = new EntityGroupDto(groupEntity)

        return entityGroupDto
    }

    public static async getGroups(clusterId : number) {
        const groupEntityArray = await GroupEntity.findBy({clusterId})

        const entityGroupDtoArray = groupEntityArray.map((groupEntity) => new EntityGroupDto(groupEntity))

        return entityGroupDtoArray
    }

    public static async refreshGroup(telegramClient : ApiTelegramClient, groupId : number) {

        const groupEntity = await GroupEntity.findOneBy({id: groupId})

        const dataGroupDto = await telegramClient.parseGroup(groupEntity.telegramId)

        await GroupEntity.update({id: groupId}, dataGroupDto)

        const updatedGroupEntity = GroupEntity.findOneBy({id: groupId})

        const entityGroupDto = new EntityGroupDto(updatedGroupEntity)

        return entityGroupDto
    }

    public static async refreshGroups(telegramClient : ApiTelegramClient, clusterId : number) {

        const groupEntityArray = await GroupEntity.findBy({clusterId})

        const entityGroupDtoArray = []

        for(const groupEntity of groupEntityArray) {

            const entityGroupDto = GroupService.refreshGroup(telegramClient, groupEntity.id)

            entityGroupDtoArray.push(entityGroupDto)
        }

        return entityGroupDtoArray
    }

    public static async addGroup(telegramClient : ApiTelegramClient, clusterId : number, telegramId : string) {

        const dataGroupDto = await telegramClient.parseGroup(telegramId)

        const groupEntity = GroupEntity.create({...dataGroupDto, clusterId})

        await groupEntity.save()

        const entityGroupDto = new EntityGroupDto(groupEntity)

        return entityGroupDto
    }

    public static async searchGroups(telegramClient : ApiTelegramClient, title : string) {

        const telegramIdArray = await telegramClient.searchGroups(title)

        const dataGroupDtoArray = []

        for(const telegramId of telegramIdArray) {

            const dataGroupDto = telegramClient.parseGroup(telegramId)

            dataGroupDtoArray.push(dataGroupDto)
        }

        return dataGroupDtoArray
    }

    public static async parseGroup(telegramClient : ApiTelegramClient, groupId : number) {

        const groupEntity = await GroupEntity.findOneBy({id: groupId})

        const clientEntityArray = await ClientEntity.findBy({clusterId: groupEntity.clusterId})

        const groupClientEntityArray = clientEntityArray.filter((clientEntity) => {
            return clientEntity.groups.includes(groupEntity.id)
        })

        const telegramIdArray = await telegramClient.parseGroupMembers(groupEntity.telegramId, groupClientEntityArray.length)

        const entityClientDtoArray = []

        for(const telegramId of telegramIdArray) {

            const dataClientDto = await telegramClient.parseAccount(telegramId)

            const candidate = await ClientEntity.findOneBy({username: dataClientDto.username})

            if(candidate) {

                if(candidate.groups.includes(groupId)) continue

                candidate.groups.push(groupId)

                await candidate.save()

                const entityClientDto = new EntityClientDto(candidate)

                entityClientDtoArray.push(entityClientDto)

                continue
            }

            const clientEntity = ClientEntity.create({...dataClientDto, clusterId: groupEntity.clusterId, groups: [groupEntity.id]})

            await clientEntity.save()

            const entityClientDto = new EntityClientDto(clientEntity)

            entityClientDtoArray.push(entityClientDto)
        }

        return entityClientDtoArray
    }

    public static async removeGroup(groupId : number) {

        const groupEntity = await GroupEntity.findOneBy({id: groupId})

        const clientEntityArray = await ClientEntity.findBy({clusterId: groupEntity.clusterId})

        for(const clientEntity of clientEntityArray) {

            clientEntity.groups = clientEntity.groups.filter((group) => group !== groupId)

            await clientEntity.save()
        }

        await groupEntity.remove()


    }

}