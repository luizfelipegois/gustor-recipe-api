import { Router } from "express"
import UserService from "../services/user.service"
import AuthMiddlewares from "../middlewares/auth.middleware"
import UserMiddlewares from "../middlewares/user.middleware"

const router: Router = Router()
const userService = new UserService()
const { verifyAdmin, verifyToken } = AuthMiddlewares
const { checkID } = UserMiddlewares

router.get("/find", verifyAdmin, (req, res) => userService.findAll(req, res))

router.get("/find/:id", verifyToken, checkID, (req, res) =>
  userService.findById(req, res),
)

router.put("/update/:id", verifyAdmin, checkID, (req, res) =>
  userService.update(req, res),
)

router.delete("/delete/:id", verifyAdmin, checkID, (req, res) =>
  userService.delete(req, res),
)

export default router
