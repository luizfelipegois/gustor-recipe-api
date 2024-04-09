import { Router } from "express"
import AuthService from "../services/auth.service"
import authMiddlewares from "../middlewares/auth.middleware"

const router: Router = Router()
const authService = new AuthService()
const {
  validateFullName,
  validateEmail,
  validatePassword,
  validateCredentials,
} = authMiddlewares

router.post(
  "/signup",
  validateFullName,
  validateEmail,
  validatePassword,
  (req, res) => authService.register(req, res),
)
router.post("/signin", validateCredentials, (req, res) =>
  authService.login(req, res),
)

export default router
