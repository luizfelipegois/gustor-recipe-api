import { Request, Response } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"
import { recipeModel } from "../models/recipe.model"

export default class RecipeService {
  public async register({ body }: Request, res: Response): Promise<void> {
    try {
      await recipeModel.createRecipe(body)
      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "Recipe created successfully", error: false })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
