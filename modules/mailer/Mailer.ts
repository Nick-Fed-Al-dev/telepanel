import * as nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

import {config} from "../config/config"
import {activationMail} from "./mails/activation.mail"

export class Mailer {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

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

    public async sendActivationMail(to : string, link : string) {
        const mail = activationMail(link)

        await this.transporter.sendMail({
            from: config.SMTP_USER,
            to,
            subject: mail.title,
            text: "",
            html: mail.markup
        })
    }
}