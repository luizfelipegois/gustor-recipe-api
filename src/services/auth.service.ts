import { Request, Response } from "express"
import jwt = require("jsonwebtoken")
import { config } from "dotenv"
import { userModel } from "../models/user.model"
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
        )
        res.status(HTTP_STATUS.OK).json({
          error: false,
          message: "User successfully authenticated",
          token,
        })
      } else {
        throw new Error("SECRET_KEY is not defined in environment variables.")
      }
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModel.findAllUsers()

      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: `Total users found: ${users.length}`,
        users,
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const user = await userModel.findUserById(id)
      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: "Successfully found user",
        user,
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await userModel.updateUser(id, req.body)
      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: "User updated successfully",
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await userModel.deleteUser(id)
      res.status(HTTP_STATUS.OK).json({
        error: false,
        message: "User deleted successfully",
      })
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
