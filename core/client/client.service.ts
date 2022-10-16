import {ClientEntity} from "./client.entity"
import {EntityClientDto} from "./dto/entity-client.dto"

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

    public static async refreshClients() {

    }

    public static async refreshClient() {

    }

    public static async updateClient(clientId : number, update : any) {

        await ClientEntity.update({id: clientId}, update)

        const clientEntity = await ClientEntity.findOneBy({id: clientId})

        const entityClientDto = new EntityClientDto(clientEntity)

        return entityClientDto

    }
}