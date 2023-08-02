import { SES } from 'aws-sdk'
import fs from 'fs'
import Handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from "tsyringe";

import { IMailProvider, ISendMail } from "../IMailProvider";

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        region: process.env.AWS_REGION,
        apiVersion: "2010-12-01"
      })
    })
  }
  async sendMail({ subject, to, path, variables }: ISendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = Handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>", // ? Colocar um email válido
      subject,
      html: templateHtml
    })
  }
}