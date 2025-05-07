import CustomError from "@/db/exceptions/CustomError";
import UserModel from "@/db/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

interface ILogin {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
      const body : ILogin = await request.json();
      const token: string = await UserModel.loginUser(body);
      console.log('pass');
      
      return NextResponse.json({ token }, { status: 200 });
    } catch (err) {
      if (err instanceof CustomError) {
        return NextResponse.json(
          { message: err.message },
          { status: err.status }
        );
      }
      return NextResponse.json({ message: "ISE" }, { status: 500 });
    }
}