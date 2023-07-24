import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { IDateProvider } from "../DateProvider"

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate)  
    const startDateUtc = this.convertToUTC(startDate)  

    return dayjs(endDateUtc).diff(startDateUtc, "hours")
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}