"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const mockado = require("mockado");
const mongoose_1 = require("mongoose");
const src_1 = require("../../../../src");
const database_1 = require("../../../../src/database/database");
const constants_1 = require("../../../../src/helpers/constants");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDatabase)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Test responses to user signIn middleware", () => {
    it("should return 401 with an error message if email or password are incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(src_1.default)
            .post("/v1/auth/signin")
            .send({
            email: mockado.email({ numbers: true }),
            password: mockado.password(),
        });
        expect(response.status).toBe(constants_1.HTTP_STATUS.UNAUTHORIZED);
        expect(response.body).toHaveProperty("message", "Invalid credentials");
        expect(response.body).toHaveProperty("error", true);
    }));
});
