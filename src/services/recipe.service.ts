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

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const queryCategory = req.query.category as string | undefined
      const queryNew = req.query.new as string | undefined
      let recipes

      if (queryNew) {
        recipes = await recipeModel.findNewsRecipes()
      } else if (queryCategory) {
        recipes = await recipeModel.findRecipesByCategory(queryCategory)
      } else {
        recipes = await recipeModel.findAllRecipes()
      }

      res.status(HTTP_STATUS.OK).json({
        message: `Total recipes found: ${recipes.length}`,
        recipes,
        error: false,
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const response = await recipeModel.findRecipeById(id)
      res.status(HTTP_STATUS.OK).json({
        recipe: response,
        error: false,
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await recipeModel.updateRecipe(id, req.body)
      res.status(HTTP_STATUS.OK).json({
        message: "Recipe updated successfully",
        error: false,
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
