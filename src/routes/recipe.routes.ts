import { Router } from "express"
import RecipeService from "../services/recipe.service"
import { isAdmin, verifyToken } from "../middlewares/validateToken.middleware"
import { checkRecipe } from "../middlewares/recipe.middleware"

const router: Router = Router()
const recipeService = new RecipeService()

router.post("/create", isAdmin, verifyToken, checkRecipe, (req, res) =>
  recipeService.register(req, res),
)

export default router
