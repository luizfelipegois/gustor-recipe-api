import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { recipeModel } from "../models/recipe.model"
import { errorHandler } from "../helpers/error"
import { RequestBody, Ingredient, Step } from "../types/recipe.types"

const requiredFields: (keyof RequestBody)[] = [
  "title",
  "description",
  "image",
  "preparationTime",
  "calories",
  "categories",
  "ingredients",
  "assessments",
  "steps",
]

export default class RecipeMiddlewares {
  static checkIfYouHaveMandatoryFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    req.body.assessments = req.body.assessments || []

    const missingFields = requiredFields.filter((field) => !(field in req.body))

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: true,
        message: `Missing fields: ${missingFields.join(", ")}`,
      })
    }

    const invalidFields = requiredFields.filter((field) => {
      switch (field) {
        case "categories":
          return !Array.isArray(req.body[field])
        case "ingredients":
          return (
            !Array.isArray(req.body[field]) ||
            req.body[field].some((item: Ingredient) => !isValidIngredient(item))
          )
        case "steps":
          return (
            !Array.isArray(req.body[field]) ||
            req.body[field].some((item: Step) => !isValidStep(item))
          )
        case "assessments":
          return !Array.isArray(req.body[field])
        default:
          return typeof req.body[field] !== "string"
      }
    })

    if (invalidFields.length > 0) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `Invalid type for fields: ${invalidFields.join(", ")}` })
    }

    next()
  }
  static async duplicateTitleArrives(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { title } = req.body

      const recipe = await recipeModel.findRecipeByTitle(title)

      if (recipe) {
        res
          .status(HTTP_STATUS.CONFLICT)
          .json({ message: "Recipe already registered", error: true })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
  static async checkID(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      const recipe = await recipeModel.findRecipeById(id)

      if (!recipe) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: true, message: "Recipe not found" })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}

function isValidIngredient(item: Ingredient): item is Ingredient {
  return typeof item.name === "string" && typeof item.amount === "string"
}

function isValidStep(item: Step): item is Step {
  return typeof item.title === "string" && typeof item.text === "string"
}
