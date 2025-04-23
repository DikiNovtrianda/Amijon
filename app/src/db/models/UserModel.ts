import { z } from "zod";
import { getDB } from "../config/mongodb";
import { encryptPassword } from "../helpers/bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

interface ILogin {
  username: string;
  password: string;
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
    users.insertOne({
      ...payload,
      password: encryptPassword(payload.password),
    })
    return "Register success!"
  }
}
