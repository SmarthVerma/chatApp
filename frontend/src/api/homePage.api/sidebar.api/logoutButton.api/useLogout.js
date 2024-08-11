import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout as sliceLogout } from "../../../../store/slices/userSlice";

const useLogout =  () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const logout = async () => {
        setLoading(true)
        try {
            const url = '/api/v1/auth/logout'

            const response = await axios.get(url)
            console.log(response)
            
            // update redux userState
        } catch (error) {
            toast.error(error.message)
            console.log(`error in useLogout`, error)
            throw error
        } finally {
            dispatch(sliceLogout())
            setLoading(false)
        }
    }

    return {loading, logout}
}

export { useLogout }