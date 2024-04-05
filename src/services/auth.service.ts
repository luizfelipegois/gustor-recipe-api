import { Request, Response } from "express"
import jwt = require("jsonwebtoken")
import { userModel } from "../models/user.model"
import { config } from "dotenv"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"

config()

export default class AuthService {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password } = req.body

      await userModel.createUser(fullName, email, password)
      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "User created successfully", error: false })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body
      const user = await userModel.findUserByEmail(email)
      const SECRET_KEY = process.env.SECRET_KEY

      if (SECRET_KEY) {
        const token = jwt.sign(
          { id: user?._id, fullName: user?.fullName, isAdmin: user?.isAdmin },
          SECRET_KEY,
          {
            expiresIn: "1h",
          },
        )
        res.status(HTTP_STATUS.OK).json({
          token,
          message: "User successfully authenticated",
          error: false,
        })
      } else {
        throw new Error("SECRET_KEY is not defined in environment variables.")
      }
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
