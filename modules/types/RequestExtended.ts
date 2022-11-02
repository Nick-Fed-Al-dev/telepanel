import * as express from "express"

import {PayloadUserDto} from "../../core/user/dto/payload-user.dto"

export type RequestExtended = {
    user: PayloadUserDto
} & express.Request