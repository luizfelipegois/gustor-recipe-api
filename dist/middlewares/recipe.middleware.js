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
const recipe_model_1 = require("../models/recipe.model");
const error_1 = require("../helpers/error");
const requiredFields = [
    "title",
    "description",
    "image",
    "preparationTime",
    "calories",
    "categories",
    "ingredients",
    "assessments",
    "steps",
];
class RecipeMiddlewares {
    static checkIfYouHaveMandatoryFields(req, res, next) {
        req.body.assessments = req.body.assessments || [];
        const missingFields = requiredFields.filter((field) => !(field in req.body));
        if (missingFields.length > 0) {
            return res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                error: true,
                message: `Missing fields: ${missingFields.join(", ")}`,
            });
        }
        const invalidFields = requiredFields.filter((field) => {
            switch (field) {
                case "categories":
                    return !Array.isArray(req.body[field]);
                case "ingredients":
                    return (!Array.isArray(req.body[field]) ||
                        req.body[field].some((item) => !isValidIngredient(item)));
                case "steps":
                    return (!Array.isArray(req.body[field]) ||
                        req.body[field].some((item) => !isValidStep(item)));
                case "assessments":
                    return !Array.isArray(req.body[field]);
                default:
                    return typeof req.body[field] !== "string";
            }
        });
        if (invalidFields.length > 0) {
            return res
                .status(constants_1.HTTP_STATUS.BAD_REQUEST)
                .json({ error: `Invalid type for fields: ${invalidFields.join(", ")}` });
        }
        next();
    }
    static duplicateTitleArrives(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                const recipe = yield recipe_model_1.recipeModel.findRecipeByTitle(title);
                if (recipe) {
                    res
                        .status(constants_1.HTTP_STATUS.CONFLICT)
                        .json({ message: "Recipe already registered", error: true });
                    return;
                }
                next();
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    static checkID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const recipe = yield recipe_model_1.recipeModel.findRecipeById(id);
                if (!recipe) {
                    res
                        .status(constants_1.HTTP_STATUS.NOT_FOUND)
                        .json({ error: true, message: "Recipe not found" });
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
exports.default = RecipeMiddlewares;
function isValidIngredient(item) {
    return typeof item.name === "string" && typeof item.amount === "string";
}
function isValidStep(item) {
    return typeof item.title === "string" && typeof item.text === "string";
}
