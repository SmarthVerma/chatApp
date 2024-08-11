import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";

function SearchInput() {

    const { register, handleSubmit } = useForm();

    const searchHandle = (data) => {
        console.log(data,)
    }

    return (
        <form className='flex items-center gap-2'>
            <input
                {...register}
                type="text"
                className="input input-bordered rounded-full"
                placeholder="Search..."
            />
            <button type='submit' onClick={handleSubmit} className='btn btn-circle cursor-pointer bg-green-600 text-white'>
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchInput
