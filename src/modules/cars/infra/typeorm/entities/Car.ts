import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { Category } from "./Category"
import { Specification } from "./Specification"

@Entity("cars")
export class Car {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  dailyRate: number

  @Column()
  available: boolean

  @Column()
  licensePlate: string

  @Column()
  fineAmount: number

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category

  @Column()
  categoryId: string

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "carId" }],
    inverseJoinColumns: [{ name: "specificationsId" }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
    this.available = true
  }
}