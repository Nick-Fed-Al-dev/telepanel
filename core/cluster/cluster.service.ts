import {CreateClusterDto} from "./dto/create-cluster.dto"
import {UpdateClusterDto} from "./dto/update-cluster.dto"
import {ClusterEntity} from "./cluster.entity"
import {EntityClusterDto} from "./dto/entity-cluster.dto"

export class ClusterService {

    public static async findCluster(clusterId : number) {

        const clusterEntity = await ClusterEntity.findOneBy({id: clusterId})

        const entityClusterDto = new EntityClusterDto(clusterEntity)

        return entityClusterDto
    }

    public static async findClusters(userId : number) {

        const clusterEntityArray = await ClusterEntity.findBy({userId})

        const entityClusterDtoArray = clusterEntityArray.map((clusterEntity) => new EntityClusterDto(clusterEntity))

        return entityClusterDtoArray
    }

    public static async createCluster(createClusterDto : CreateClusterDto) {
        const clusterEntity = ClusterEntity.create(createClusterDto as unknown as ClusterEntity)
        await clusterEntity.save()

        const entityClusterDto = new EntityClusterDto(clusterEntity)

        return entityClusterDto
    }

    public static async updateCluster(clusterId : number, updateClusterDto : UpdateClusterDto) {
        await ClusterEntity.update({id: clusterId}, updateClusterDto)

        const clusterEntity = await ClusterEntity.findOneBy({id: clusterId})

        const entityClusterDto = new EntityClusterDto(clusterEntity)

        return entityClusterDto
    }

    public static async removeCluster(clusterId : number) {
        await ClusterEntity.delete({id: clusterId})
    }

}