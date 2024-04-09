import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../helpers/constants"
import { errorHandler } from "../helpers/error"
import { userModel } from "../models/user.model"

export default class UserMiddlewares {
  static async checkID(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params

      const user = await userModel.findUserById(id)

      if (!user) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: true, message: "User not found" })
        return
      }

      next()
    } catch (error) {
      errorHandler(res, error as Error)
    }
  }
}
