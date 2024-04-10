import request = require("supertest")
import mockado = require("mockado")
import mongoose from "mongoose"
import server from "../../../../src"
import { connectDatabase } from "../../../../src/database/database"
import { HTTP_STATUS } from "../../../../src/helpers/constants"

beforeAll(async () => {
  await connectDatabase()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Test responses to user signIn middleware", () => {
  it("should return 401 with an error message if email or password are incorrect", async () => {
    const response = await request(server)
      .post("/v1/auth/signin")
      .send({
        email: mockado.email({ numbers: true }),
        password: mockado.password(),
      })

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED)
    expect(response.body).toHaveProperty("message", "Invalid credentials")
    expect(response.body).toHaveProperty("error", true)
  })
})
