import * as dotenv from "dotenv"
import {IConfigNames} from "./IConfigNames"

export const config = (dotenv.config().parsed as unknown as IConfigNames)