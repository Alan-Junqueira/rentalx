export interface IDateProvider {
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
}