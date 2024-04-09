import { model, Schema } from "mongoose"
import bcrypt = require("bcrypt")
import { UserDocument } from "../types/user.types"

class UserModel {
  private userModel = model<UserDocument>(
    "User",
    new Schema<UserDocument>(
      {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true },
    ),
  )

  public async createUser(
    fullName: string,
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new this.userModel({
      fullName,
      email,
      password: hashedPassword,
    })
    return await newUser.save()
  }

  public async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email })
  }
}

export const userModel = new UserModel()
