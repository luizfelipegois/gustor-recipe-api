import { Router } from "express"
import AuthService from "../services/auth.service"
import {
  checkEmailIsValid,
  checkFullNameIsValid,
  checkPasswordIsValid,
} from "../middlewares/validateUserInputs.middlewares"
import { validateCredentials } from "../middlewares/validateCredentials.middlewares"

const router: Router = Router()
const authService = new AuthService()

router.post(
  "/signup",
  checkFullNameIsValid,
  checkEmailIsValid,
  checkPasswordIsValid,
  (req, res) => authService.register(req, res),
)
router.post("/signin", validateCredentials, (req, res) =>
  authService.login(req, res),
)

export default router
