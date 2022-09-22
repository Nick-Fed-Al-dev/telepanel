import * as express from "express"

import {PayloadUserDto} from "../../core/user/dto/payload-user.dto"
import {ApiTelegramClient} from "../ApiTelegramClient"

export type RequestExtended = {
    user: PayloadUserDto
    telegramClient : ApiTelegramClient
} & express.Request