import jwt = require("jsonwebtoken")
import bcrypt = require("bcrypt")
import dotenv = require("dotenv")
import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"
import { Credentials, TokenPayload } from "../types/user.types"
import { userModel } from "../models/user.model"
import { emailRegex, fullNameRegex, passwordRegex } from "../utils/regex"

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export default class authMiddlewares {
  static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = Array.isArray(req.headers.authorization)
        ? req.headers.authorization[0]
        : req.headers.authorization

      if (!token) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: "Token not provided", error: true })
        return
      }

      const decodedToken = jwt.verify(token, SECRET_KEY!) as TokenPayload

      if (!decodedToken) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: "Invalid token", error: true })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  static async verifyAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = Array.isArray(req.headers.authorization)
        ? req.headers.authorization[0]
        : req.headers.authorization

      const { isAdmin } = jwt.decode(token) as TokenPayload

      if (!isAdmin) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: "You are not authorized to proceed", error: true })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  static async validateCredentials(
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

  static async validateFullName(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fullName } = body

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

  static async validateEmail(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = body

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

  static async validatePassword(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { password } = body

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
}
