import mongoose from "mongoose"

import { connectDatabase } from "./database"

describe("Database Connection", () => {
  beforeAll(async () => {
    await connectDatabase()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it("should connect to the database", () => {
    expect(mongoose.connection.readyState).toBe(1)
  })
})
