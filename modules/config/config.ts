import * as dotenv from "dotenv"
import {IConfigNames} from "./IConfigNames"

// парсим .env файл как IConfigNames
// так у нас будет возможность пользоваться типизированым конфигом
export const config = (dotenv.config().parsed as unknown as IConfigNames)