import CustomError from "@/db/exceptions/CustomError";
import UserModel from "@/db/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    const body : IUser = await request.json();
    const message: string = await UserModel.registerUser(body);
    return NextResponse.json({ message }, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      const error = err.errors[0];
      return NextResponse.json(
        { message: `${error.path} - ${error.message}` },
        { status: 400 }
      );
    }
    if (err instanceof CustomError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json({ message: "ISE" }, { status: 500 });
  }
}