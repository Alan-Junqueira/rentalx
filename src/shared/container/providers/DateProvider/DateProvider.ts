export interface IDateProvider {
  addDays(days: number): Date
  addHours(hours: number): Date
  compareIfBefore(startDate: Date, endDate: Date): boolean
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
}