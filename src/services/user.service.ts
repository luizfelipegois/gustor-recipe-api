import { Request, Response } from "express"
import { config } from "dotenv"
import { userModel } from "../models/user.model"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"

config()

export default class UserService {
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
