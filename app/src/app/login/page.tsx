"use client"

import { useState } from "react";
import { actLogin } from "./action";
import { useRouter } from "next/navigation";

export interface ILogin {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<ILogin>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await actLogin(data);
      if (response.error) {
        console.error("Registration failed.");
        return;
      }
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center w-full h-16 ">
        <h1 className="text-3xl font-bold mb-4">Amijon</h1>
      </div>
      <div className="bg-white p-12 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign-In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Sign-In
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-500">
        <p>
          New to Amazon?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Create your Amazon account
          </a>
        </p>
      </footer>
    </div>
  );
}
