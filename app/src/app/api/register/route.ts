import UserModel from "@/db/models/UserModel";

interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export default async function POST(request: Request) {
  try {
    const body : IUser = await request.json();
    const message: string = await UserModel.registerUser(body);
    return Response.json({ message }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "ISE" }, { status: 500 });
  }
}