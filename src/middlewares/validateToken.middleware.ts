import jwt = require("jsonwebtoken")
import dotenv = require("dotenv")
import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

interface TokenPayload {
  id: string
  isAdmin: boolean
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization

    if (!token) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Token not provided", error: true })
    }

    const decodedToken = jwt.verify(token, SECRET_KEY!) as TokenPayload

    if (!decodedToken) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid token", error: true })
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization

    const { isAdmin } = jwt.decode(token) as TokenPayload

    if (!isAdmin) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "You are not authorized to proceed", error: true })
    }

    next()
  } catch (error) {
    errorHandler(res, error as Error)
  }
}
