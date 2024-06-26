import { Router } from "express"
import RecipeService from "../services/recipe.service"
import AuthMiddlewares from "../middlewares/auth.middleware"
import RecipeMiddlewares from "../middlewares/recipe.middleware"

const router: Router = Router()
const recipeService = new RecipeService()
const { checkID, checkIfYouHaveMandatoryFields, duplicateTitleArrives } =
  RecipeMiddlewares
const { verifyAdmin, verifyToken } = AuthMiddlewares

router.post(
  "/create",
  verifyAdmin,
  checkIfYouHaveMandatoryFields,
  duplicateTitleArrives,
  (req, res) => recipeService.register(req, res),
)
router.get("/find", verifyToken, (req, res) => recipeService.findAll(req, res))
router.get("/find/:id", verifyToken, checkID, (req, res) =>
  recipeService.findById(req, res),
)
router.put(
  "/update/:id",
  verifyAdmin,
  checkID,
  duplicateTitleArrives,
  (req, res) => recipeService.update(req, res),
)
router.delete("/delete/:id", verifyAdmin, checkID, (req, res) =>
  recipeService.delete(req, res),
)

export default router
