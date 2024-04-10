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

describe("Test responses to user signUp middleware", () => {
  it("should return 400 with an error message if the Full Name field is in the wrong format", async () => {
    const response = await request(server)
      .post("/v1/auth/signup")
      .send({
        fullName: mockado.name({ type: "username" }),
        email: mockado.email({ numbers: true }),
        password: mockado.password({
          length: 20,
          letters: true,
          capitalLetters: true,
          numbers: true,
          specialCharacters: true,
        }),
      })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty(
      "message",
      "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character",
    )
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 400 with an error message if the Email field is in the wrong format", async () => {
    const response = await request(server)
      .post("/v1/auth/signup")
      .send({
        fullName: mockado.name({ type: "fullName" }),
        email: "",
        password: mockado.password({
          length: 20,
          letters: true,
          capitalLetters: true,
          numbers: true,
          specialCharacters: true,
        }),
      })

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty(
      "message",
      "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character",
    )
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 409 with error message if Email already registered", async () => {
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

    const response = await request(server).post("/v1/auth/signup").send({
      fullName: userCredentials.fullName,
      email: userCredentials.email,
      password: userCredentials.password,
    })

    expect(response.status).toBe(HTTP_STATUS.CONFLICT)
    expect(response.body).toHaveProperty("message", "Email already registered")
    expect(response.body).toHaveProperty("error", true)
  })
  it("should return 400 with an error message if the Password field is in the wrong format", async () => {
    const userCredentials = {
      fullName: mockado.name({ type: "fullName", gender: "female" }),
      email: mockado.email({ numbers: true }),
      password: "",
    }
    const response = await request(server)
      .post("/v1/auth/signup")
      .send(userCredentials)

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST)
    expect(response.body).toHaveProperty(
      "message",
      "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character",
    )
    expect(response.body).toHaveProperty("error", true)
  })
})
