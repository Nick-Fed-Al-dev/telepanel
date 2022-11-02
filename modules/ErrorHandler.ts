import {FloodService} from "../core/flood/flood.service"
import {RequestExtended} from "./types/RequestExtended"
import {AccountEntity} from "../core/account/account.entity"

export class ErrorHandler {

    public static async handle(message : string, req : RequestExtended) {

        if(message.includes("SESSION_REVOKED")) {

            const accountId = Number(req.body.accountId)

            await AccountEntity.update({id: accountId}, {isAuthorized: false})

        } else if(message.includes("A wait of")) {

            const periodSeconds = Number(message.split(" ")[3])
            const accountId = Number(req.params.accountId)

            await FloodService.refreshFlood(accountId, periodSeconds)

        }

    }

}