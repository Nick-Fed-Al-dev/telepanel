import * as express from "express"

import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {ApiError} from "../../modules/ApiError"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UsersService} from "./users.service"
import {AuthorizedUserDto} from "./dto/authorized-user.dto"
import {ApiResponse} from "../../modules/ApiResponse"
import {LoginUserDto} from "./dto/login-user.dto"

export class UsersController {

    static refreshTokenCookieName = "refreshToken"

    private static pushRefreshTokenCookie(res : express.Response, refreshToken : string) {
        res.cookie(
            UsersController.refreshTokenCookieName,
            refreshToken,
            {
                maxAge: Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS),
                httpOnly: true
            }
        )
    }

    public static async register(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const registerUserDto : RegisterUserDto = req.body

            const authorizedCredentialUserDto = await UsersService.register(registerUserDto)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UsersController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            const response = ApiResponse.created("user registered", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async login(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const loginUserDto : LoginUserDto = req.body

            const authorizedCredentialUserDto = await UsersService.login(loginUserDto)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UsersController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            const response = ApiResponse.created("user logged in", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refresh(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const {refreshToken} = req.cookies

            const authorizedCredentialUserDto = await UsersService.refresh(refreshToken)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UsersController.pushRefreshTokenCookie(res, refreshToken)

            const response = ApiResponse.created("authorization updated", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async logout(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const {refreshToken} = req.cookies

            console.log(refreshToken)
            await UsersService.logout(refreshToken)

            res.clearCookie(UsersController.refreshTokenCookieName)

            const response = ApiResponse.created("user logged out")

            next(response)

        } catch (error : any) {
            next(error)
        }
    }
}