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
          type: [{ name: String, amount: Number }],
          required: true,
        },
        assessments: {
          type: [{ evaluator: String, note: Number }],
          required: true,
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

  public async findRecipeById(id: string): Promise<RecipeDocument | null> {
    return await this.recipeModel.findById(id)
  }
}

export const recipeModel = new RecipeModel()
