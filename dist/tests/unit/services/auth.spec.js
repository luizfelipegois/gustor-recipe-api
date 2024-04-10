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
const src_1 = require("../../../src");
const database_1 = require("../../../src/database/database");
const constants_1 = require("../../../src/helpers/constants");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDatabase)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Test responses to user signUp", () => {
    it("should return 201 with User created successfully message", () => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        const response = yield request(src_1.default)
            .post("/v1/auth/signup")
            .send(userCredentials);
        expect(response.status).toBe(constants_1.HTTP_STATUS.CREATED);
        expect(response.body).toHaveProperty("message", "User created successfully");
        expect(response.body).toHaveProperty("error", false);
    }));
});
describe("Test responses to user signIn", () => {
    it("should return the status code 200 and a json with the authentication token", () => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        yield request(src_1.default).post("/v1/auth/signup").send(userCredentials);
        const response = yield request(src_1.default)
            .post("/v1/auth/signin")
            .send(userCredentials);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("message", "User successfully authenticated");
        expect(response.body).toHaveProperty("error", false);
    }));
});
