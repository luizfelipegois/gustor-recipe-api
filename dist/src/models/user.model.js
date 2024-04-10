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
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
class UserModel {
    constructor() {
        this.userModel = (0, mongoose_1.model)("User", new mongoose_1.Schema({
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            isAdmin: {
                type: Boolean,
                default: false,
            },
        }, { timestamps: true }));
    }
    createUser(fullName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new this.userModel({
                fullName,
                email,
                password: hashedPassword,
            });
            return yield newUser.save();
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email });
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel
                .find({}, "-password -isAdmin -_id")
                .lean()
                .exec();
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel
                .findById(id, "-password -isAdmin -_id")
                .lean()
                .exec();
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findByIdAndUpdate(id, { $set: userData }, { new: true });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findByIdAndDelete(id).lean().exec();
        });
    }
}
exports.userModel = new UserModel();
