import { v4 as uuidV4 } from "uuid"

export class Car {
  id: string
  name: string
  description: string
  dailyRate: number
  available: boolean
  licensePlate: string
  fineAmount: string
  brand: string
  categoryId: string
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
    this.available = true
    this.createdAt = new Date()
  }
}