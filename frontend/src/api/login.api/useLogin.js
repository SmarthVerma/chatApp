import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { login as sliceLogin } from '../../store/slices/userSlice'
const useLogin = () => { // potential error

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const login = async (input) => {
        console.log('hey Inputs',)
        const url = "/api/v1/auth/login"
        console.log('its working here',)
        setLoading(true)
        try {
            const response = await axios.post(url, input);

            dispatch(sliceLogin(response.data.data))

            toast.success(response.data?.message)
            return response.data.data
        } catch (error) {
            console.log('error in useLogin', error.response.data?.message)
            console.error()
            toast.error(error.response?.data.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export { useLogin }