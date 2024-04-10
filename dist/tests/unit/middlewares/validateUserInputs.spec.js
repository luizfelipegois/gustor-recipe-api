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
describe("Test responses to user signUp middleware", () => {
    it("should return 400 with an error message if the Full Name field is in the wrong format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(src_1.default)
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
        });
        expect(response.status).toBe(constants_1.HTTP_STATUS.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character");
        expect(response.body).toHaveProperty("error", true);
    }));
    it("should return 400 with an error message if the Email field is in the wrong format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(src_1.default)
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
        });
        expect(response.status).toBe(constants_1.HTTP_STATUS.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character");
        expect(response.body).toHaveProperty("error", true);
    }));
    it("should return 409 with error message if Email already registered", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield request(src_1.default).post("/v1/auth/signup").send({
            fullName: userCredentials.fullName,
            email: userCredentials.email,
            password: userCredentials.password,
        });
        expect(response.status).toBe(constants_1.HTTP_STATUS.CONFLICT);
        expect(response.body).toHaveProperty("message", "Email already registered");
        expect(response.body).toHaveProperty("error", true);
    }));
    it("should return 400 with an error message if the Password field is in the wrong format", () => __awaiter(void 0, void 0, void 0, function* () {
        const userCredentials = {
            fullName: mockado.name({ type: "fullName", gender: "female" }),
            email: mockado.email({ numbers: true }),
            password: "",
        };
        const response = yield request(src_1.default)
            .post("/v1/auth/signup")
            .send(userCredentials);
        expect(response.status).toBe(constants_1.HTTP_STATUS.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character");
        expect(response.body).toHaveProperty("error", true);
    }));
});
