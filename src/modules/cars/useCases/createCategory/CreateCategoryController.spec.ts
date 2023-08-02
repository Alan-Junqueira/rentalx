import { hash } from "bcryptjs"
import request from "supertest"
import { Connection } from "typeorm"
import { v4 as uuidV4 } from 'uuid'

import { app } from "@shared/infra/http/app"
import createConnection from "@shared/infra/typeorm"

let connection: Connection

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost")
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "driverLicense")
        values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'xxxxxx')
    `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to crete a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({
        email: "admin@email.com",
        password: "admin"
      })

    const { refreshToken } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        "name": "Category Supertest",
        "description": "Categoria description Supertest"
      })
      .set({
        Authorization: `Bearer ${refreshToken}`
      })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a new category with existent name.', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({
        email: "admin@email.com",
        password: "admin"
      })

    const { refreshToken } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        "name": "Category Supertest",
        "description": "Categoria description Supertest"
      })
      .set({
        Authorization: `Bearer ${refreshToken}`
      })

    expect(response.status).toBe(400)
  })
})