import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {TagService} from "./tag.service";
import {ApiResponse} from "../../modules/ApiResponse";
import {ApiError} from "../../modules/ApiError";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";

export class TagController {

    public static async getTags(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const userId = req.user.id

            const entityTagDtoArray = await TagService.getTags(userId)

            const response = ApiResponse.ok("tags received", entityTagDtoArray)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async getTag(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const tagId = Number(req.params.tagId)

            const entityTagDto = await TagService.getTag(tagId)

            const response = ApiResponse.ok("tag received", entityTagDto)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async createTag(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const userId = req.user.id
            const body = req.body

            const createTagDto = new CreateTagDto({...body, userId})

            const entityTagDto = await TagService.createTag(createTagDto)

            const response = ApiResponse.created("tag created", entityTagDto)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async updateTag(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const tagId = Number(req.params.tagId)
            const body = req.body

            const updateTagDto = new UpdateTagDto(body)

            const entityTagDto = await TagService.updateTag(tagId, updateTagDto)

            const response = ApiResponse.ok("tag updated", entityTagDto)

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

    public static async removeTag(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const tagId = Number(req.params.tagId)

            await TagService.removeTag(tagId)

            const response = ApiResponse.ok("tag removed")

            next(response)

        } catch(error : any) {
            next(error)
        }
    }

}