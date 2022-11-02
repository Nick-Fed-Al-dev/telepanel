import * as express from "express"

import {RequestExtended} from "../types/RequestExtended"
import {FloodService} from "../../core/flood/flood.service"

export const floodMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {
            await FloodService.updateFloods(req.user.id)

            next()
        } catch (error : any) {
            next(error)
        }
    }
}