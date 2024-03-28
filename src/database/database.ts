import mongoose from "mongoose"
import { config } from "dotenv"

config()

mongoose.set("strictQuery", true)

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.tckmhai.mongodb.net/${process.env.DBCOLLECTION}?retryWrites=true&w=majority`,
    )
  } catch (error) {
    console.error(error)
  }
}
