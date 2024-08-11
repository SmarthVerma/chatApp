import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function handleInputErrors({ fullName, email, password, confirmPassword, gender }) {
    if (!fullName || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Password does not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}

function useSignup(input) {
    
    const [loading, setLoading] = useState(false) // good importance for visual pov
    const signup = async (input) => {

 
        const isValid = handleInputErrors(input)
        if (!isValid) return null;
        
        const url = "/api/v1/auth/signup"

        const formData = new FormData();
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('confirmPassword', input.confirmPassword);
        formData.append('gender', input.gender);
        formData.append('avatar', input.avatar[0]);
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // !Important: set content type to multipart/form-data
            }
        };

        setLoading(true)
        try {
            const response = await axios.post(url, formData, config);
            console.log('Signup successful:', response.data);

            return response.data
        } catch (error) {
            toast.error("Something went wrong when creating your account")
            throw error
        } finally {
            setLoading(false)
        }
    };

    return { loading, signup };
};

export { useSignup }
