import request = require("supertest")
import server from "./server"

describe("Server startup", () => {
  it("Checks if the server is responding to the '/v1' route", () => {
    return request(server).get("/v1").expect(200)
  })
})
