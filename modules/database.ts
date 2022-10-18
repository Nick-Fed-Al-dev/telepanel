import {DataSource} from "typeorm"

import {postgresqlConfig} from "./config/postgresql.config"
import {UserEntity} from "../core/user/user.entity"
import {RefreshTokenEntity} from "../core/refresh-token/refresh-token.entity"
import {TariffEntity} from "../core/tariff/tariff.entity"
import {ChargeEntity} from "../core/charge/charge.entity"
import {AccountEntity} from "../core/account/account.entity"
import {SessionEntity} from "../core/session/session.entity"
import {ClusterEntity} from "../core/cluster/cluster.entity"
import {ClientEntity} from "../core/client/client.entity"
import {GroupEntity} from "../core/group/group.entity";

const entities = [
    UserEntity,
    RefreshTokenEntity,
    TariffEntity,
    ChargeEntity,
    AccountEntity,
    SessionEntity,
    ClusterEntity,
    ClientEntity,
    GroupEntity
]

export const database = new DataSource(postgresqlConfig(entities))