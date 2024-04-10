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
exports.recipeModel = void 0;
const mongoose_1 = require("mongoose");
class RecipeModel {
    constructor() {
        this.recipeModel = (0, mongoose_1.model)("Recipe", new mongoose_1.Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, default: "" },
            preparationTime: { type: String, required: true },
            calories: { type: String, required: true },
            categories: { type: [String], required: true },
            ingredients: {
                type: [{ name: String, amount: String }],
                required: true,
            },
            assessments: {
                type: [{ evaluator: String, note: Number }],
                required: true,
                default: [],
            },
            steps: {
                type: [{ title: String, text: String }],
                required: true,
            },
        }, { timestamps: true }));
    }
    createRecipe(recipeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecipe = new this.recipeModel(recipeData);
            return yield newRecipe.save();
        });
    }
    findAllRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel.find().lean().exec();
        });
    }
    findRecipesByCategory(queryCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel
                .find({
                categories: {
                    $in: [queryCategory],
                },
            })
                .lean()
                .exec();
        });
    }
    findNewsRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel
                .find()
                .sort({ createdAt: -1 })
                .limit(1)
                .lean()
                .exec();
        });
    }
    findRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel.findById(id).lean().exec();
        });
    }
    findRecipeByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel.findOne({ title }).lean().exec();
        });
    }
    updateRecipe(id, recipeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel.findByIdAndUpdate(id, { $set: recipeData }, { new: true });
        });
    }
    deleteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recipeModel.findByIdAndDelete(id).lean().exec();
        });
    }
}
exports.recipeModel = new RecipeModel();
