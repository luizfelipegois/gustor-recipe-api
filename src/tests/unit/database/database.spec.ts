import mongoose from "mongoose"

import { connectDatabase } from "../../../../src/database/database"

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
