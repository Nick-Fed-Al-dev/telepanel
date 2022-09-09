import * as jwt from "jsonwebtoken"

import {PayloadUserDto} from "../users/dto/payload-user.dto"
import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {RefreshTokensEntity} from "./refresh-tokens.entity";
import {EntityRefreshTokenDto} from "./dto/entity-refresh-token.dto";

export class RefreshTokensService {

    public static generateTokenPair(payloadUserDto : PayloadUserDto) {
        const accessTokenDurationMs = Time.convertDaysToMs(config.ACCESS_TOKEN_DURATION_DAYS)
        const refreshTokenDurationMs = Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS)

        const accessToken = jwt.sign(
            payloadUserDto,
            config.ACCESS_TOKEN_SECRET,
            {expiresIn: accessTokenDurationMs}
        )

        const refreshToken = jwt.sign(
            payloadUserDto,
            config.REFRESH_TOKEN_SECRET,
            {expiresIn: refreshTokenDurationMs}
        )

        return {
            accessToken,
            refreshToken
        }
    }

    public static async saveRefreshToken(refreshToken : string, userId : number) {
        const candidate = await RefreshTokensEntity.findOneBy({userId})

        if(candidate) {
            candidate.refreshToken = refreshToken
            await candidate.save()
        }

        const entityRefreshTokenDto = RefreshTokensEntity.create({userId, refreshToken})
        await entityRefreshTokenDto.save()

        return entityRefreshTokenDto
    }

    public static async removeRefreshToken(refreshToken : string) {
        const entityRefreshTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})
        await entityRefreshTokenDto.remove()
    }

    public static validateAccessToken(accessToken : string) {
        try {
            const payloadUserDto = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}

    }

    public static validateRefreshToken(refreshToken : string) {
        try {
            const payloadUserDto = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}
    }

}