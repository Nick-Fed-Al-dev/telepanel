import * as bcrypt from "bcrypt"

import {PayloadUserDto} from "./dto/payload-user.dto"
import {RefreshTokensService} from "../refreshTokens/refresh-tokens.service"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UsersEntity} from "./users.entity"
import {config} from "../../modules/config/config"
import {ApiError} from "../../modules/ApiError"
import {LoginUserDto} from "./dto/login-user.dto"
import {RefreshTokensEntity} from "../refreshTokens/refresh-tokens.entity"
import {AuthorizedCredentialUserDto} from "./dto/authorized-credential-user.dto"

export class UsersService {

    private static async createTokensFromUser(entityUserDto : UsersEntity) : Promise<AuthorizedCredentialUserDto> {

        const payloadUserDto = new PayloadUserDto(entityUserDto)

        const tokenPair = RefreshTokensService.generateTokenPair(payloadUserDto)

        await RefreshTokensService.saveRefreshToken(tokenPair.refreshToken, payloadUserDto.id)

        const authorizedCredentialUserDto = new AuthorizedCredentialUserDto({...payloadUserDto, ...tokenPair})

        return authorizedCredentialUserDto
    }

    public static async register(registerUserDto : RegisterUserDto) : Promise<AuthorizedCredentialUserDto> {
        const candidate = await UsersEntity.findOneBy({email: registerUserDto.email})

        if (candidate) {
            ApiError.badRequest("user with this email already exist")
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, Number(config.PASSWORD_HASH_SALT))
        registerUserDto.password = hashedPassword

        const entityUserDto = UsersEntity.create(registerUserDto as unknown as UsersEntity)
        await entityUserDto.save()

        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    public static async login(loginUserDto : LoginUserDto) : Promise<AuthorizedCredentialUserDto> {
        const candidate = await UsersEntity.findOneBy({email: loginUserDto.email})

        if(!candidate) {
            ApiError.notFound("user not found")
        }

        const isPasswordMatch = await bcrypt.compare(loginUserDto.password, candidate.password)

        if(!isPasswordMatch) {
            ApiError.badRequest("incorrect password")
        }

        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(candidate)

        return authorizedCredentialUserDto
    }

    public static async refresh(refreshToken : string) : Promise<AuthorizedCredentialUserDto> {
        const payloadUserDto = RefreshTokensService.validateRefreshToken(refreshToken)
        const entityTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})

        if(!payloadUserDto || !entityTokenDto) {
            ApiError.unauthorized("no refresh token")
        }

        const entityUserDto = await UsersEntity.findOneBy({id: payloadUserDto.id})
        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    public static async logout(refreshToken : string) : Promise<void> {
        const entityTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})
        await entityTokenDto?.remove()
    }
}