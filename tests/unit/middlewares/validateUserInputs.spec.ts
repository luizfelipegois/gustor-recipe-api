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

describe("Test responses to user signUp middleware", () => {
  it("should return 400 with error message if Invalid Full Name", async () => {
    const response = await request(server)
      .post("/v1/auth/signup")
      .send({
        fullName: mockado.name({ type: "username" }),
      })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty("message", "Invalid Full Name")
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 400 with error message if Invalid email format", async () => {
    const response = await request(server)
      .post("/v1/auth/signup")
      .send({
        fullName: mockado.name({ type: "fullName" }),
        email: "",
      })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty("message", "Invalid email format")
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 400 with error message if Email already registered", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName", gender: "male" }),
      email: mockado.email(),
      password: mockado.password({
        length: 20,
        letters: true,
        capitalLetters: true,
        numbers: true,
        specialCharacters: true,
      }),
    }

    await request(server).post("/v1/auth/signup").send(userCredentials)

    const response = await request(server).post("/v1/auth/signup").send({
      fullName: userCredentials.fullName,
      email: userCredentials.email,
      password: userCredentials.password,
    })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty("message", "Email already registered")
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 400 with error message if Invalid password format", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName", gender: "female" }),
      email: mockado.email(),
      password: mockado.password({
        length: 20,
        letters: true,
        capitalLetters: true,
        numbers: true,
        specialCharacters: true,
      }),
    }
    const response = await request(server).post("/v1/auth/signup").send({
      fullName: userCredentials.fullName,
      email: userCredentials.email,
      password: "",
    })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty(
      "message",
      "Invalid password, check that the password is at least 8 characters long and includes at least one lowercase character, one uppercase character, one digit, and one special character (@, $, !, %, *, ?, or &)",
    )
    expect(response.body).toHaveProperty("error", true)
  })
})
