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

describe("Test responses to user signUp", () => {
  it("should return 201 with User created successfully message", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName" }),
      email: mockado.email({ numbers: true }),
      password: mockado.password({
        length: 20,
        letters: true,
        capitalLetters: true,
        numbers: true,
        specialCharacters: true,
      }),
    }

    const response = await request(server)
      .post("/v1/auth/signup")
      .send(userCredentials)

    expect(response.status).toBe(HTTP_STATUS.CREATED)
    expect(response.body).toHaveProperty("message", "User created successfully")
    expect(response.body).toHaveProperty("error", false)
  })
})

describe("Test responses to user signIn", () => {
  it("should return the status code 200 and a json with the authentication token", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName" }),
      email: mockado.email({ numbers: true }),
      password: mockado.password({
        length: 20,
        letters: true,
        capitalLetters: true,
        numbers: true,
        specialCharacters: true,
      }),
    }

    await request(server).post("/v1/auth/signup").send(userCredentials)

    const response = await request(server)
      .post("/v1/auth/signin")
      .send(userCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty(
      "message",
      "User successfully authenticated",
    )
    expect(response.body).toHaveProperty("error", false)
  })
})
