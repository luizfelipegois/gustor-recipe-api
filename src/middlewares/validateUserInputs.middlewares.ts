import { Request, Response, NextFunction } from "express"
import { emailRegex, fullNameRegex, passwordRegex } from "../utils/regex"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"
import { userModel } from "../models/user.model"

export function checkFullNameIsValid(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { fullName } = req.body

    if (!fullName || fullName.length < 3 || !fullNameRegex.test(fullName)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid Full Name", error: true })
      return
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}

export async function checkEmailIsValid(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email } = req.body

    if (!email || !emailRegex.test(email)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid email format", error: true })
      return
    }

    const user = await userModel.findUserByEmail(email)

    if (user) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Email already registered", error: true })
      return
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}

export function checkPasswordIsValid(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { password } = req.body

    if (!password || !passwordRegex.test(password)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:
          "Invalid password, check that the password is at least 8 characters long and includes at least one lowercase character, one uppercase character, one digit, and one special character (@, $, !, %, *, ?, or &)",
        error: true,
      })
      return
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}
