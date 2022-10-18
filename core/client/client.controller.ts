import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ApiError} from "../../modules/ApiError"
import {ClientService} from "./client.service";
import {ApiResponse} from "../../modules/ApiResponse";

export class ClientController {

    public static async findClients(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)

            const entityClientDtoArray = await ClientService.getClients(clusterId)

            const response = ApiResponse.ok("clients received", entityClientDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async findClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clientId = Number(req.params.clientId)

            const entityClientDto = await ClientService.getClient(clientId)

            const response = ApiResponse.ok("client received", entityClientDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refreshClients(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)

            const entityClientDtoArray = ClientService.refreshClients(req.telegramClient, clusterId)

            const response = ApiResponse.ok("clients refreshed", entityClientDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refreshClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clientId = Number(req.params.clientId)

            const entityClientDto = ClientService.refreshClient(req.telegramClient, clientId)

            const response = ApiResponse.ok("client refreshed", entityClientDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async updateClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clientId = Number(req.params.clientId)

            const update = req.body

            const entityClientDto = await ClientService.updateClient(clientId, update)

            const response = ApiResponse.ok("client updated", entityClientDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

}