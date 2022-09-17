import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"
import {UserEntity} from "../core/user/user.entity"
import {RefreshTokenEntity} from "../core/refreshToken/refresh-token.entity"
import {TariffEntity} from "../core/tariff/tariff.entity"
import {ChargeEntity} from "../core/charge/charge.entity"

const entities = [UserEntity, RefreshTokenEntity, TariffEntity, ChargeEntity]

export const database = new DataSource(postgresqlConfig(entities))