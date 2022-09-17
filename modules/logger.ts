import * as winston from "winston"

export const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: ".log", dirname: "logs"}),
        new winston.transports.File({filename: "error.log", dirname: "logs", level: "error"})
    ]
})
