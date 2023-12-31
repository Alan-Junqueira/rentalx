import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { IDateProvider } from "../DateProvider"

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate()
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate)
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate)
    const startDateUtc = this.convertToUTC(startDate)

    return dayjs(endDateUtc).diff(startDateUtc, "days")
  }

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