import { Router } from "express"
import AuthService from "../services/auth.service"
import authMiddlewares from "../middlewares/auth.middleware"

const router: Router = Router()
const authService = new AuthService()
const { validateInput, validateCredentials, checkRegisteredEmail } =
  authMiddlewares

router.post("/signup", validateInput, checkRegisteredEmail, (req, res) =>
  authService.register(req, res),
)
router.post("/signin", validateCredentials, (req, res) =>
  authService.login(req, res),
)

export default router
