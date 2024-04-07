import { Document } from "mongoose"

export interface UserDocument extends Document {
  fullName: string
  email: string
  password: string
  isAdmin: boolean
}

export interface Credentials {
  email: string
  password: string
}
