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
const constants_1 = require("../helpers/constants");
const error_1 = require("../helpers/error");
const user_model_1 = require("../models/user.model");
class UserMiddlewares {
    static checkID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_model_1.userModel.findUserById(id);
                if (!user) {
                    res
                        .status(constants_1.HTTP_STATUS.NOT_FOUND)
                        .json({ error: true, message: "User not found" });
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
exports.default = UserMiddlewares;
