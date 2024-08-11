import React from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import { useSignup } from "../../api/signup.api/useSignup";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const { loading, signup } = useSignup()

    const createAccount = async (data) => {
        console.log(data)
        try {
            const response = await signup(data)
            
            if (response) {
                navigate('/login')
                toast.success('Successfully Registered!')
            }
        } catch (error) {
            console.log('Error in signup Page', error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto box-border'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-800'>
                    SignUp
                    <span className='text-green-600'> ChatApp</span>
                </h1>

                <form
                    onSubmit={handleSubmit(createAccount)}
                    className='flex flex-col gap-2 m-3'
                >
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            {...register("fullName")}
                            type="text"
                            className="grow"
                            placeholder="Full Name"
                        />
                    </label>

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
                            className="grow"
                            placeholder='Password'
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
                            {...register("confirmPassword")}
                            type="password"
                            className="grow"
                            placeholder='Confrim Password'
                        />
                    </label>

                    <Controller
                        name="gender"
                        control={control}
                        defaultValue="Male"
                        render={({ field }) => <GenderCheckBox field={field} />}
                    />

                    <label htmlFor="file" className='flex flex-col'><span className='label-text font-bold text-lg text-center'>Avatar</span>
                        <input
                            {...register("avatar")}
                            id='file'
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </label>




                    <Link to={'/login'} className="link link-hover text-sm">Already have an account?</Link>

                    <div className=''>

                        <button className={`btn btn-success w-full bg-green-600 `} disabled={loading} >SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Signup
