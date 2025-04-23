import { z } from "zod";
import { getDB } from "../config/mongodb";
import { comparePassword, encryptPassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/jwt";

interface IUser {
  name: string
  email: string
  password: string
  username: string
}

interface ILogin {
  username: string
  password: string
}

const userSchema = z.object({
  name: z.string(),
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
})

export default class UserModel {
  static getCollection() {
    const db = getDB()
    return db.collection<IUser>("users")
  }

  static async registerUser(payload: IUser) {
    userSchema.parse(payload)
    const users = this.getCollection()
    await users.insertOne({
      ...payload,
      password: encryptPassword(payload.password),
    })
    return "Register success!"
  }

  static async userLogin(payload: ILogin) {
    const users = this.getCollection()
    const user = await users.findOne({ username: payload.username })
    if (!user) {
      throw new Error("User not found")
    }
    if (!comparePassword(payload.password, user.password)) {
      throw new Error("Wrong password")
    }
    const token: string = generateToken({_id : user._id, username : user.username})
    return token;
  }
}
