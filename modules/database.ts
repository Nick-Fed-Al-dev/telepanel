import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"

const entities = []

export const database = new DataSource(postgresqlConfig(entities))