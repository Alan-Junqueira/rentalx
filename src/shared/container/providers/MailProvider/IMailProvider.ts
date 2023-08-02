export interface ISendMail {
  to: string
  subject: string
  variables: unknown
  path: string
}

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>
}