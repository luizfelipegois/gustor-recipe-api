import { Response } from "express"
import { HTTP_STATUS } from "./constants"

export function errorHandler(res: Response, err: Error) {
  console.error(err)
  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send(`Internal Server Error: ${err.message}`)
}
export { HTTP_STATUS }
