import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import * as cookieParser from "cookie-parser"

import {config} from "../modules/config/config"
import {logger} from "../modules/logger"
import {database} from "../modules/database"
import {corsConfig} from "../modules/config/cors.config"
import {router} from "./router"
import {responseMiddleware} from "../modules/middlewares/response.middleware"

const app = express()

app.use(cors(corsConfig()))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
app.use(responseMiddleware())

export const PORT = Number(config.PORT || config.DEV_PORT)
export const APP_URL = `${config.APP_PROTOCOL}://${config.APP_HOST}:${PORT}`
export const APP_MODE = config.NODE_ENV || "development"

if(APP_MODE === "production") {
    app.get("/", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"))
    })
}

export const start = async () => {
    try {
        await database.initialize()
        logger.info("database was initialized")

        app.listen(PORT, () => {
            logger.info(`server has been started...`)
            logger.info(`server could be accessed at ${APP_URL} address`)
            logger.info(`server is running in ${APP_MODE} mode`)
        })
    } catch (error : any) {
        logger.error(error)
        process.exit(1)
    }
}