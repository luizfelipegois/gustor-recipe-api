import { config } from "dotenv"
import server from "."
import { connectDatabase } from "./database/database"

config()

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
connectDatabase()
