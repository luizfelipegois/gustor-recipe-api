import { Router } from "express"
import RecipeService from "../services/recipe.service"
import { isAdmin, verifyToken } from "../middlewares/validateToken.middleware"
import {
  checkRecipeTitle,
  duplicateTitleArrives,
} from "../middlewares/recipe.middleware"

const router: Router = Router()
const recipeService = new RecipeService()

router.post(
  "/create",
  isAdmin,
  verifyToken,
  duplicateTitleArrives,
  checkRecipeTitle,
  (req, res) => recipeService.register(req, res),
)
router.get("/find", (req, res) => recipeService.findAll(req, res))
router.get("/find/:id", (req, res) => recipeService.findById(req, res))
router.put(
  "/update/:id",
  duplicateTitleArrives,
  isAdmin,
  verifyToken,
  (req, res) => recipeService.update(req, res),
)
router.delete("/delete/:id", isAdmin, verifyToken, (req, res) =>
  recipeService.delete(req, res),
)

export default router
