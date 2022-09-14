import * as nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

import {config} from "../config/config"
import {activationMail} from "./mails/activation.mail"

// класс нужен для рассылок по email
export class Mailer {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    // в конструкторе инициализируем транспортер, который и нужен для отправки писем
    // транспортер требует параметры для входа
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMPT_HOST,
            port: Number(config.SMTP_PORT),
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD
            }
        })
    }

    // метод служит для оправки писем
    // принимает в себя почтовый адрес и ссылку для активации
    public async sendActivationMail(to : string, link : string) {
        // формируем письмо из ссылки
        const mail = activationMail(link)

        // отправляем письмо
        await this.transporter.sendMail({
            from: config.SMTP_USER,
            to,
            subject: mail.title,
            text: "",
            html: mail.markup
        })
    }
}