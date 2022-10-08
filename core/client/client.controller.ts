import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ClientService} from "./client.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {AddClientDto} from "./dto/add-client.dto"
import {AddParsedClientDto} from "./dto/add-parsed-client.dto"
import {ApiError} from "../../modules/ApiError";

export class ClientController {

    public static async getClients(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const userId = req.user.id

            const entityClientDtoArray = await ClientService.getClients(userId)

            const response = ApiResponse.ok("clients received", entityClientDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async getClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const clientId = Number(req.params.clientId)

            const entityClientDto = await ClientService.getClient(clientId)

            const response = ApiResponse.ok("client received", entityClientDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async addParsedClients(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const {usernames, groupId} = new AddParsedClientDto(req.body)
            const userId = req.user.id

            const entityClientDtoArray = await ClientService.saveParsedClients(req.telegramClient, userId, usernames, groupId)

            const response = ApiResponse.created("clients created", entityClientDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async addClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const {username} = new AddClientDto(req.body)
            const userId = req.user.id

            const entityClientDto = await ClientService.saveClient(req.telegramClient, userId, username)

            const response = ApiResponse.created("client created", entityClientDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refreshClients(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const entityClientDtoArray = await ClientService.refreshClients(req.telegramClient, userId)

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

            const entityClientDto = await ClientService.refreshClient(req.telegramClient, clientId)

            const response = ApiResponse.ok("client refreshed", entityClientDto)

            next(response)
        } catch (error : any) {
            next(error)
        }
    }

    public static async removeClient(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clientId = Number(req.params.clientId)

            await ClientService.removeClient(clientId)

            const response = ApiResponse.ok("client removed")

            next(response)
        } catch (error : any) {
            next(error)
        }
    }

}