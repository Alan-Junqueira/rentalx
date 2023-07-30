import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'

@Entity("rentals")
export class Rental {
  @PrimaryColumn()
  id: string

  @Column()
  carId: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: "carId" })
  car: Car

  @Column()
  userId: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column()
  expectedReturnDate: Date

  @Column()
  total: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}