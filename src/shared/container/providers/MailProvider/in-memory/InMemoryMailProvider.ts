import { IMailProvider, ISendMail } from "../IMailProvider";


export class InMemoryMailProvider implements IMailProvider {
  private message: unknown[] = []

  async sendMail(data: ISendMail): Promise<void> {
    this.message.push(data)
  }

}