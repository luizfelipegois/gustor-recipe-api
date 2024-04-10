"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const _1 = require(".");
describe("Server startup", () => {
    it("Checks if the server is responding to the '/v1' route", () => {
        return request(_1.default).get("/v1").expect(200);
    });
});
