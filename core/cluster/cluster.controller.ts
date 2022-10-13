import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ClusterService} from "./cluster.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {ApiError} from "../../modules/ApiError"
import {CreateClusterDto} from "./dto/create-cluster.dto"
import {UpdateClusterDto} from "./dto/update-cluster.dto"

export class ClusterController {

    public static async findClusters(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const entityClusterDtoArray = await ClusterService.findClusters(userId)

            const response = ApiResponse.ok("clusters received", entityClusterDtoArray)

            next(response)
        } catch(error : any) {
            next(error)
        }
    }

    public static async findCluster(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)

            const entityClusterDto = await ClusterService.findCluster(clusterId)

            const response = ApiResponse.ok("cluster received", entityClusterDto)

            next(response)
        } catch(error : any) {
            next(error)
        }
    }

    public static async createCluster(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const userId = req.user.id
            const body = req.body

            const createClusterDto = new CreateClusterDto({...body, userId})

            const entityClusterDto = await ClusterService.createCluster(createClusterDto)

            const response = ApiResponse.created("cluster created", entityClusterDto)

            next(response)
        } catch(error : any) {
            next(error)
        }
    }

    public static async updateCluster(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)
            const updateClusterDto = new UpdateClusterDto(req.body)

            const entityClusterDto = await ClusterService.updateCluster(clusterId, updateClusterDto)

            const response = ApiResponse.ok("cluster updated", entityClusterDto)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async removeCluster(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const clusterId = Number(req.params.clusterId)

            await ClusterService.removeCluster(clusterId)

            const response = ApiResponse.ok("cluster removed")

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

}