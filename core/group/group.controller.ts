import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ApiError} from "../../modules/ApiError"
import {GroupService} from "./group.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {AddGroupDto} from "./dto/add-group.dto"
import {SearchGroupDto} from "./dto/search-group.dto"

export class GroupController {

    public static async getGroup(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const groupId = Number(req.params.groupId)

            const entityGroupDto = await GroupService.getGroup(groupId)

            const response = ApiResponse.ok("group received", entityGroupDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async getGroups(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)

            const entityGroupDtoArray = await GroupService.getGroups(clusterId)

            const response = ApiResponse.ok("groups received", entityGroupDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refreshGroup(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const groupId = Number(req.params.groupId)

            const entityGroupDto = await GroupService.refreshGroup(req.telegramClient, groupId)

            const response = ApiResponse.ok("group refreshed", entityGroupDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refreshGroups(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)

            const entityGroupDtoArray = await GroupService.refreshGroups(req.telegramClient, clusterId)

            const response = ApiResponse.ok("groups refreshed", entityGroupDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async addGroup(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const clusterId = Number(req.params.clusterId)
            const addGroupDto = new AddGroupDto(req.body)

            const entityGroupDto = GroupService.addGroup(req.telegramClient, clusterId, addGroupDto.telegramId)

            const response = ApiResponse.created("group created", entityGroupDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async searchGroups(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const searchGroupDto = new SearchGroupDto(req.body)

            const dataGroupDtoArray = await GroupService.searchGroups(req.telegramClient, searchGroupDto.title)

            const response = ApiResponse.ok("groups founded", dataGroupDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async parseGroup(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const groupId = Number(req.params.groupId)

            const entityClientDtoArray = await GroupService.parseGroup(req.telegramClient, groupId)

            const response = ApiResponse.created("group parsed", entityClientDtoArray)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async removeGroup(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const groupId = Number(req.params.groupId)

            await GroupService.removeGroup(groupId)

            const response = ApiResponse.ok("group removed")

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

}