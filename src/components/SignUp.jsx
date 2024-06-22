import React, {useState} from 'react'
import {Input, Button, Logo} from './index';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';


function SignUp() {
    const[error, setError] = useState(""); //Setting up a error state and updating it whenever any error occurs
    const dispatch = useDispatch(); //Initializing the useDispatch function from react-redux to send data to our login reducer and update the state
    const navigate = useNavigate(); //To force redirect the page
    const {handleSubmit, register} = useForm(); //destructuring the methods we get from useForm hook
    
    const signUp = async(data) => {
        setError("");
        try {
            const session = await authService.createAccount(data); //authService.createAccount({email, password, name}) --> Returns a session
            if(session){
                const userData = await authService.getCurrentUser(); //Retrieving current user and saving it to userData
                if(userData){ //If the userData exists
                    dispatch(authLogin(userData)); //adding userData to our state using login reducer
                    navigate("/") //Redirecting to the homepage
                }
            }
        } catch (error) {
            setError(error.message); //If something goes wrong, we set the error to error.message
        }
    }
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(signUp)}>
        <Input label="Name: " placeholder="Enter your name" {...register("name", {
            required: true
        })} />
        <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", {
              required: true, // required validation
              validate: { // custom validation
                  matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address"
        }})}/>
        <Input label="Password: " placeholder="Enter your password" type="password" {...register("password", {required: true})}/>
        <Button type="Submit" className="w-full">Register</Button>
      </form>
      </div>
    </div>
  )
}

export default SignUp
