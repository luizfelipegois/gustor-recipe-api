import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { recipeModel } from "../models/recipe.model"
import { errorHandler } from "../helpers/error"

export async function checkRecipe(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { title } = req.body

    if (!title) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Title not provided", error: true })
      return
    }

    const recipe = await recipeModel.findRecipeByTitle(title)

    if (recipe) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Recipe already registered", error: true })
      return
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}
