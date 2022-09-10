import * as winston from "winston"

// пакет winston нужен для организации единообразного логгирования
export const logger = winston.createLogger({
    // задаем формат ведения логов
    format: winston.format.json(),
    transports: [
        // перечисляем варианты ведения логов
        new winston.transports.Console(),
        new winston.transports.File({filename: ".log", dirname: "logs"}),
        new winston.transports.File({filename: "error.log", dirname: "logs", level: "error"})
    ]
})
