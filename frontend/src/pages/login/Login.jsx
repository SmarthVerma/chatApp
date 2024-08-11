import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useLogin } from '../../api/login.api/useLogin';
import toast from 'react-hot-toast';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loading, login } = useLogin()
    const navigate = useNavigate()

    const loginUser = async (data) => {
        try {
            await login(data)
        } catch (error) {
            console.log('Error in login Page', error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-800'>
                    Login
                    <span className='text-green-600'> ChatApp</span>
                </h1>
                <form className='m-3' action="" onSubmit={handleSubmit(loginUser)}>
                    <div className='space-y-2'>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                {...register("email")}
                                type="text"
                                className="grow"
                                placeholder="Email"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input
                                {...register("password")}
                                type="password"
                                className="grow placeholder:opacity-75"
                                placeholder='••••••••'
                            />
                        </label>
                        <Link to={'/signup'} className="link link-hover ">Don't have an account?</Link>

                        <div className=''>

                            <button type='submit' className="btn btn-success w-full bg-green-600">LogIn</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
