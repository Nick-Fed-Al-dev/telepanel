import * as bcrypt from "bcrypt"
import * as uuid from "uuid"

import {PayloadUserDto} from "./dto/payload-user.dto"
import {RefreshTokenService} from "../refreshToken/refresh-token.service"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UserEntity} from "./user.entity"
import {config} from "../../modules/config/config"
import {ApiError} from "../../modules/ApiError"
import {LoginUserDto} from "./dto/login-user.dto"
import {RefreshTokenEntity} from "../refreshToken/refresh-token.entity"
import {AuthorizedCredentialUserDto} from "./dto/authorized-credential-user.dto"
import {Mailer} from "../../modules/mailer/Mailer"
import {TariffService} from "../tariff/tariff.service";
import {CreateTariffDto} from "../tariff/dto/create-tariff.dto";
import {ChargeService} from "../charge/charge.service";

export class UserService {

    private static async createTokensFromUser(entityUserDto : UserEntity) : Promise<AuthorizedCredentialUserDto> {

        const payloadUserDto = new PayloadUserDto(entityUserDto)

        const tokenPair = RefreshTokenService.generateTokenPair(payloadUserDto)

        await RefreshTokenService.saveRefreshToken(tokenPair.refreshToken, payloadUserDto.id)

        const authorizedCredentialUserDto = new AuthorizedCredentialUserDto({...payloadUserDto, ...tokenPair})

        return authorizedCredentialUserDto
    }

    public static async activate(activationCode : string) {

        const entityUserDto = await UserEntity.findOneBy({activationCode})

        if(!entityUserDto) {
            ApiError.notFound("no user with this activation code found")
        }

        entityUserDto.isActivated = true
        await entityUserDto.save()

        await ChargeService.createCharge(entityUserDto.id)
    }

    public static async register(registerUserDto : RegisterUserDto) : Promise<AuthorizedCredentialUserDto> {

        const candidate = await UserEntity.findOneBy({email: registerUserDto.email})

        if (candidate) {
            ApiError.badRequest("user with this email already exist")
        }

        let entityUserDto = registerUserDto as unknown as UserEntity

        const hashedPassword = await bcrypt.hash(entityUserDto.password, Number(config.PASSWORD_HASH_SALT))
        const activationCode = uuid.v4()

        entityUserDto.password = hashedPassword
        entityUserDto.activationCode = activationCode

        entityUserDto = UserEntity.create(registerUserDto as unknown as UserEntity)
        await entityUserDto.save()

        const createTariffDto = new CreateTariffDto({userId: entityUserDto.id, name: config.FREE_TRIAL_TARIFF_NAME, period: config.FREE_TRIAL_DURATION_DAYS})
        const entityTariffDto = TariffService.createTariff(createTariffDto)

        const activationLink = `${config.APP_URL}/api/users/activate/${entityUserDto.activationCode}`
        const mailer = new Mailer()
        await mailer.sendActivationMail(entityUserDto.email, activationLink)

        const authorizedCredentialUserDto = await UserService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    public static async login(loginUserDto : LoginUserDto) : Promise<AuthorizedCredentialUserDto> {

        const candidate = await UserEntity.findOneBy({email: loginUserDto.email})

        if(!candidate) {
            ApiError.notFound("user not found")
        }

        const isPasswordMatch = await bcrypt.compare(loginUserDto.password, candidate.password)

        if(!isPasswordMatch) {
            ApiError.badRequest("incorrect password")
        }

        const authorizedCredentialUserDto = await UserService.createTokensFromUser(candidate)

        return authorizedCredentialUserDto
    }

    public static async refresh(refreshToken : string) : Promise<AuthorizedCredentialUserDto> {

        const payloadUserDto = RefreshTokenService.validateRefreshToken(refreshToken)

        const entityTokenDto = await RefreshTokenEntity.findOneBy({refreshToken})

        if(!payloadUserDto || !entityTokenDto) {
            ApiError.unauthorized("no refresh token")
        }

        const entityUserDto = await UserEntity.findOneBy({id: payloadUserDto.id})

        const authorizedCredentialUserDto = await UserService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    public static async logout(refreshToken : string) : Promise<void> {
        const entityTokenDto = await RefreshTokenEntity.findOneBy({refreshToken})
        await entityTokenDto?.remove()
    }
}