import * as express from "express"
import cors = require("cors")
import { Request, Response } from "express"
import { config } from "dotenv"

config()

const server = express()
const PORT = process.env.PORT || 3001

server.use(express.json())
server.use(cors())

server.get("/v1", (req: Request, res: Response) =>
  res.status(200).json({ status: "OK" }),
)

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

export default server
