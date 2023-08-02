import fs from 'fs'
import Handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from "tsyringe";

import { IMailProvider, ISendMail } from "../IMailProvider";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    }).catch(err => console.error(err))
  }
  async sendMail({ subject, to, path, variables }: ISendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = Handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHtml
    })

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}