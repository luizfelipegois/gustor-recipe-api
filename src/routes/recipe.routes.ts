import { Router } from "express"
import RecipeService from "../services/recipe.service"
import authMiddlewares from "../middlewares/auth.middleware"
import RecipeMiddlewares from "../middlewares/recipe.middleware"

const router: Router = Router()
const recipeService = new RecipeService()
const { checkID, checkIfYouHaveMandatoryFields, duplicateTitleArrives } =
  RecipeMiddlewares
const { verifyAdmin, verifyToken } = authMiddlewares

router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  checkIfYouHaveMandatoryFields,
  duplicateTitleArrives,
  (req, res) => recipeService.register(req, res),
)
router.get("/find", (req, res) => recipeService.findAll(req, res))
router.get("/find/:id", checkID, (req, res) => recipeService.findById(req, res))
router.put(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  checkID,
  duplicateTitleArrives,
  (req, res) => recipeService.update(req, res),
)
router.delete("/delete/:id", verifyToken, verifyAdmin, checkID, (req, res) =>
  recipeService.delete(req, res),
)

export default router
