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

export default class AuthMiddlewares {
  static async verifyAdmin(
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
          .json({ error: true, message: "You are not authorized to proceed" })
        return
      }

      const decodedToken =
        (jwt.verify(token, SECRET_KEY!) as TokenPayload) || undefined
      const { isAdmin } = (jwt.decode(token) as TokenPayload) || undefined

      if (!decodedToken || !isAdmin) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: true, message: "You are not authorized to proceed" })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

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
          .json({ error: true, message: "You are not authorized to proceed" })
        return
      }

      const decodedToken =
        (jwt.verify(token, SECRET_KEY!) as TokenPayload) || undefined

      if (!decodedToken) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: true, message: "You are not authorized to proceed" })
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

      const user = await userModel.findUserByEmail(email)
      const isPasswordValid = await bcrypt.compare(
        password,
        user ? user.password : "",
      )

      if (!isPasswordValid) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: "Invalid credentials", error: true })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  static async checkRegisteredEmail(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = body
      const user = await userModel.findUserByEmail(email)

      if (user) {
        res
          .status(HTTP_STATUS.CONFLICT)
          .json({ message: "Email already registered", error: true })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  static async validateInput(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fullName, email, password } = body

      if (
        !fullName ||
        fullName.length < 3 ||
        !fullNameRegex.test(fullName) ||
        !email ||
        !emailRegex.test(email) ||
        !password ||
        !passwordRegex.test(password)
      ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message:
            "Check correct formatting of the full name and email, and whether the password contains: uppercase, lowercase, number and special character",
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
