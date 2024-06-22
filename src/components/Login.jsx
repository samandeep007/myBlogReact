import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Select, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form"; // npm install react-hook-form --> https://react-hook-form.com/get-started

function Login() {
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); // register and handleSubmit are functions from react-hook-form

  const login = async (data) => {
    setError(""); // reset error message
    try {
      const session = await authService.login(data); // login with email and password
      if (session) {
        const userData = await authService.getCurrentUser(); // get current user data; --> await is used to wait for the promise to resolve
        if (userData) {
          dispatch(authLogin({...userData})); // dispatch login action
          navigate("/"); // redirect to home page
        }
      }
    } catch (error) {
      setError(error.message); // set error message
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don't have any account?&nbsp;
              <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign Up
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'> 
                <div className="space-y-5">
                    <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", { // register email input
                        required: true, // required validation
                        validate: { // custom validation
                            matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address",
                        }
                    })}/> 
                    <Input label="Password" type="Password" placeholder="Enter your password" {...register("password", {
                        required: true, // required validation
                    })}/>
                    <Button type="Submit" className="w-full">Sign in</Button>
                </div>
            </form>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
