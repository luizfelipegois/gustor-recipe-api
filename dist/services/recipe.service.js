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
const recipe_model_1 = require("../models/recipe.model");
class RecipeService {
    register(_a, res_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res) {
            try {
                yield recipe_model_1.recipeModel.createRecipe(body);
                res
                    .status(constants_1.HTTP_STATUS.CREATED)
                    .json({ error: false, message: "Recipe created successfully" });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryCategory = req.query.category;
                const queryNew = req.query.new;
                let recipes;
                if (queryNew === "true") {
                    recipes = yield recipe_model_1.recipeModel.findNewsRecipes();
                }
                else if (queryCategory) {
                    recipes = yield recipe_model_1.recipeModel.findRecipesByCategory(queryCategory);
                }
                else {
                    recipes = yield recipe_model_1.recipeModel.findAllRecipes();
                }
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: `Total recipes found: ${recipes.length}`,
                    recipes,
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
                const response = yield recipe_model_1.recipeModel.findRecipeById(id);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "Successfully found cooking recipe",
                    recipe: response,
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
                yield recipe_model_1.recipeModel.updateRecipe(id, req.body);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "Recipe updated successfully",
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
                yield recipe_model_1.recipeModel.deleteRecipe(id);
                res.status(constants_1.HTTP_STATUS.OK).json({
                    error: false,
                    message: "Recipe deleted successfully",
                });
            }
            catch (error) {
                (0, error_1.errorHandler)(res, error);
            }
        });
    }
}
exports.default = RecipeService;
