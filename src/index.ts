import * as express from "express"
import { Request, Response } from "express"
import cors = require("cors")
import swaggerUi = require("swagger-ui-express")
import swaggerDocument = require("../swagger.json")
import authRoutes from "./routes/auth.routes"

const server = express()

server.use(express.json())
server.use(cors())

server.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.get("/v1/swagger", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/swagger.json")
})
server.get("/v1/docs", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/index.html")
})
server.get("/v1", (req: Request, res: Response) =>
  res.status(200).json({ status: "OK" }),
)
server.use("/v1/auth", authRoutes)

export default server
