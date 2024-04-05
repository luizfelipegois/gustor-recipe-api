import { Request, Response, NextFunction } from "express"
import { Credentials } from "../types/types"
import { userModel } from "../models/user.model"
import bcrypt = require("bcrypt")
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"

export async function validateCredentials(
  { body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password }: Credentials = body

    if (!email || !password) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Email and password are required", error: true })
      return
    }

    const user = await userModel.findUserByEmail(email)
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "User not found", error: true })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid password", error: true })
      return
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}
