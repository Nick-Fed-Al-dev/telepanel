import {DataSource} from "typeorm"

import {postgresqlConfig} from "./config/postgresql.config"
import {UserEntity} from "../core/user/user.entity"
import {RefreshTokenEntity} from "../core/refresh-token/refresh-token.entity"
import {TariffEntity} from "../core/tariff/tariff.entity"
import {ChargeEntity} from "../core/charge/charge.entity"
import {AccountEntity} from "../core/account/account.entity"
import {SessionEntity} from "../core/session/session.entity"
import {AccountDataEntity} from "../core/account-data/account-data.entity"
import {FloodEntity} from "../core/flood/flood.entity"
import {TagEntity} from "../core/tag/tag.entity"

const entities = [
    UserEntity,
    RefreshTokenEntity,
    TariffEntity,
    ChargeEntity,
    AccountEntity,
    SessionEntity,
    AccountDataEntity,
    FloodEntity,
    TagEntity
]

export const database = new DataSource(postgresqlConfig(entities))