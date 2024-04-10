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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const constants_1 = require("../helpers/constants");
const error_1 = require("../helpers/error");
const user_model_1 = require("../models/user.model");
const regex_1 = require("../utils/regex");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
class AuthMiddlewares {
    static verifyAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = Array.isArray(req.headers.authorization)
                    ? req.headers.authorization[0]
                    : req.headers.authorization;
                if (!token) {
                    res
                        .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                        .json({ error: true, message: "You are not authorized to proceed" });
                    return;
                }
                const decodedToken = jwt.verify(token, SECRET_KEY) || undefined;
                const { isAdmin } = jwt.decode(token) || undefined;
                if (!decodedToken || !isAdmin) {
                    res
                        .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                        .json({ error: true, message: "You are not authorized to proceed" });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = Array.isArray(req.headers.authorization)
                    ? req.headers.authorization[0]
                    : req.headers.authorization;
                if (!token) {
                    res
                        .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                        .json({ error: true, message: "You are not authorized to proceed" });
                    return;
                }
                const decodedToken = jwt.verify(token, SECRET_KEY) || undefined;
                if (!decodedToken) {
                    res
                        .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                        .json({ error: true, message: "You are not authorized to proceed" });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    static validateCredentials(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const { email, password } = body;
                const user = yield user_model_1.userModel.findUserByEmail(email);
                const isPasswordValid = yield bcrypt.compare(password, user ? user.password : "");
                if (!isPasswordValid) {
                    res
                        .status(constants_1.HTTP_STATUS.UNAUTHORIZED)
                        .json({ message: "Invalid credentials", error: true });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    static checkRegisteredEmail(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const { email } = body;
                const user = yield user_model_1.userModel.findUserByEmail(email);
                if (user) {
                    res
                        .status(constants_1.HTTP_STATUS.CONFLICT)
                        .json({ message: "Email already registered", error: true });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    static validateInput(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            try {
                const { fullName, email, password } = body;
                if (!fullName ||
                    fullName.length < 3 ||
                    !regex_1.fullNameRegex.test(fullName) ||
                    !email ||
                    !regex_1.emailRegex.test(email) ||
                    !password ||
                    !regex_1.passwordRegex.test(password)) {
                    res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                        message: "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character",
                        error: true,
                    });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
}
exports.default = AuthMiddlewares;
