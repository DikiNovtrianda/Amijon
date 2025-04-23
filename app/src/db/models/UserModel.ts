import { z } from "zod";
import { getDB } from "../config/mongodb";
import { comparePassword, encryptPassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/jwt";
import CustomError from "../exceptions/CustomError";

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
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
})

export default class UserModel {
  static getCollection() {
    const db = getDB()
    return db.collection<IUser>("users")
  }

  static async registerUser(payload: IUser) : Promise<string> {
    userSchema.parse(payload)
    const users = this.getCollection()
    await users.insertOne({
      ...payload,
      password: encryptPassword(payload.password),
    })
    return "Register success!"
  }

  static async loginUser(payload: ILogin) : Promise<string> {
    const users = this.getCollection()
    const user = await users.findOne({ username: payload.username })
    if (!user) {
      throw new CustomError("Invalid username", 401)
    }
    if (!comparePassword(payload.password, user.password)) {
      throw new CustomError("Invalid password", 401)
    }
    const token: string = generateToken({_id : user._id, username : user.username})
    return token;
  }
}
