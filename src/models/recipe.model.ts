import { model, Schema } from "mongoose"
import { RecipeDocument } from "../types/recipe.types"

class RecipeModel {
  private recipeModel = model<RecipeDocument>(
    "Recipe",
    new Schema<RecipeDocument>(
      {
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
      },
      { timestamps: true },
    ),
  )

  public async createRecipe(
    recipeData: RecipeDocument,
  ): Promise<RecipeDocument> {
    const newRecipe = new this.recipeModel(recipeData)
    return await newRecipe.save()
  }

  public async findAllRecipes(): Promise<RecipeDocument[]> {
    return await this.recipeModel.find().lean().exec()
  }

  public async findRecipesByCategory(
    queryCategory: string,
  ): Promise<RecipeDocument[]> {
    return await this.recipeModel
      .find({
        categories: {
          $in: [queryCategory],
        },
      })
      .lean()
      .exec()
  }

  public async findNewsRecipes(): Promise<RecipeDocument[]> {
    return await this.recipeModel
      .find()
      .sort({ createdAt: -1 })
      .limit(1)
      .lean()
      .exec()
  }

  public async findRecipeById(id: string): Promise<RecipeDocument | null> {
    return await this.recipeModel.findById(id).lean().exec()
  }

  public async findRecipeByTitle(
    title: string,
  ): Promise<RecipeDocument | null> {
    return await this.recipeModel.findOne({ title }).lean().exec()
  }

  public async updateRecipe(
    id: string,
    recipeData: RecipeDocument,
  ): Promise<RecipeDocument | null> {
    return await this.recipeModel.findByIdAndUpdate(
      id,
      { $set: recipeData },
      { new: true },
    )
  }

  public async deleteRecipe(id: string): Promise<RecipeDocument | null> {
    return await this.recipeModel.findByIdAndDelete(id).lean().exec()
  }
}

export const recipeModel = new RecipeModel()
