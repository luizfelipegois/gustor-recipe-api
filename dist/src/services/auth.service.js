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
const dotenv_1 = require("dotenv");
const user_model_1 = require("../models/user.model");
const constants_1 = require("../helpers/constants");
const error_1 = require("../helpers/error");
(0, dotenv_1.config)();
class AuthService {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email, password } = req.body;
                yield user_model_1.userModel.createUser(fullName, email, password);
                res
                    .status(constants_1.HTTP_STATUS.CREATED)
                    .json({ message: "User created successfully", error: false });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield user_model_1.userModel.findUserByEmail(email);
                const SECRET_KEY = process.env.SECRET_KEY;
                if (SECRET_KEY) {
                    const token = jwt.sign({ id: user === null || user === void 0 ? void 0 : user._id, fullName: user === null || user === void 0 ? void 0 : user.fullName, isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin }, SECRET_KEY, {
                        expiresIn: "1h",
                    });
                    res.status(constants_1.HTTP_STATUS.OK).json({
                        error: false,
                        message: "User successfully authenticated",
                        token,
                    });
                }
                else {
                    throw new Error("SECRET_KEY is not defined in environment variables.");
                }
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.userModel.findAllUsers();
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: `Total users found: ${users.length}`,
                    users,
                });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_model_1.userModel.findUserById(id);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "Successfully found user",
                    user,
                });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_model_1.userModel.updateUser(id, req.body);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "User updated successfully",
                });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_model_1.userModel.deleteUser(id);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "User deleted successfully",
                });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
}
exports.default = AuthService;
