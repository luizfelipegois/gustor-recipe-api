import { Router } from "express"
import RecipeService from "../services/recipe.service"
import { isAdmin, verifyToken } from "../middlewares/validateToken.middleware"

const router: Router = Router()
const recipeService = new RecipeService()

router.post("/", isAdmin, verifyToken, (req, res) =>
  recipeService.register(req, res),
)

export default router
