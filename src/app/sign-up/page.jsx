"use client";
// pages/signup.js

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    toast.success("Signed up successfully!");
    console.log(data);
  };

  return (
    <div>
      <main className="flex items-center justify-center min-h-screen absolute top-0 z-50 h-screen w-screen bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Sign Up
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                {...register("name")}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login">
              <span className="text-sm font-medium text-pink-600 hover:text-pink-500">
                Already have an account? Log in
              </span>
            </Link>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
