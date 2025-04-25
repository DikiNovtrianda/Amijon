import CustomError from "@/db/exceptions/CustomError";
import UserModel from "@/db/models/UserModel";
import { NextRequest } from "next/server";


interface ILogin {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
      const body : ILogin = await request.json();
      const token: string = await UserModel.loginUser(body);
      console.log('pass');
      
      return Response.json({ token }, { status: 200 });
    } catch (err) {
      if (err instanceof CustomError) {
        return Response.json(
          { message: err.message },
          { status: err.status }
        );
      }
      return Response.json({ message: "ISE" }, { status: 500 });
    }
}