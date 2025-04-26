"use client";

import React, { useState } from "react";
import { actRegister } from "./action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

export interface IRegister {
  name: string;
  email: string;
  password: string;
  username: string;
}

export default function Register() {
  const [data, setData] = useState<IRegister>({
    name: "",
    email: "",
    password: "",
    username: ""
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await actRegister(data);
      if (response.error) {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing your request.",
        icon: "error",
      })      
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded shadow-md w-full max-w-md mt-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-xs text-gray-500">*optional</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Passwords must be at least 5 characters.
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-500">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </footer>
    </div>
  );
}
