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
        .json({ error: false, message: "Recipe created successfully" })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const queryCategory = req.query.category as string | undefined
      const queryNew = req.query.new as string | undefined
      let recipes

      if (queryNew === "true") {
        recipes = await recipeModel.findNewsRecipes()
      } else if (queryCategory) {
        recipes = await recipeModel.findRecipesByCategory(queryCategory)
      } else {
        recipes = await recipeModel.findAllRecipes()
      }

      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: `Total recipes found: ${recipes.length}`,
        recipes,
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
        error: false,
        message: "Successfully found cooking recipe",
        recipe: response,
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
        error: false,
        message: "Recipe updated successfully",
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await recipeModel.deleteRecipe(id)
      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: "Recipe deleted successfully",
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
