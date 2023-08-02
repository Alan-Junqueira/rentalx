export interface ISendMail {
  to: string
  subject: string
  body: string
}

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>
}