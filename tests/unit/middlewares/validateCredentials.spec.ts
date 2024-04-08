import request = require("supertest")
import server from "../../../src"
import { connectDatabase } from "../../../src/database/database"
import mongoose from "mongoose"
import { HTTP_STATUS } from "../../../src/helpers/constants"
import mockado = require("mockado")

beforeAll(async () => {
  await connectDatabase()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Test responses to user signIn middleware", () => {
  it("should return 400 with error message if email and password are required", async () => {
    const response = await request(server).post("/v1/auth/signin").send({})

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty(
      "message",
      "Email and password are required",
    )
    expect(response.body).toHaveProperty("error", true)
  })

  it("should return 401 with error message if user not found", async () => {
    const response = await request(server)
      .post("/v1/auth/signin")
      .send({
        email: mockado.email({ numbers: true }),
        password: mockado.password(),
      })

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED)
    expect(response.body).toHaveProperty("message", "User not found")
    expect(response.body).toHaveProperty("error", true)
  })

  it("should return 401 with error message if invalid password", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName" }),
      email: mockado.email({ numbers: true }),
      password: mockado.password(),
    }

    await request(server).post("/v1/auth/signup").send(userCredentials)

    const response = await request(server).post("/v1/auth/signin").send({
      email: userCredentials.email,
      password: mockado.password(),
    })

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED)
    expect(response.body).toHaveProperty("message", "Invalid password")
    expect(response.body).toHaveProperty("error", true)
  })
})
