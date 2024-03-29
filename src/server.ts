import * as express from "express"
import cors = require("cors")
import { Request, Response } from "express"
import { config } from "dotenv"
import { connectDatabase } from "./database/database"
import swaggerUi = require("swagger-ui-express")
import swaggerDocument = require("../swagger.json")

config()

const server = express()
const PORT = process.env.PORT || 3001

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

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
connectDatabase()

export default server
