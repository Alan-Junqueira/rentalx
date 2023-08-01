import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

import { User } from "./User";

@Entity('users_token')
export class UserTokens {
  @PrimaryColumn()
  id: string

  @Column()
  refreshToken: string

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User

  @Column()
  expiresDate: Date

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}