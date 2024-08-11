import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherUsers } from "../../../../store/slices/otherUsersSlice";

const useGetUsers = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.otherUsers.isLoading)
    const getUsers = async () => {

        try {
            dispatch(fetchOtherUsers())
        } catch (error) {

        }
    }

    return { loading, getUsers }

}


export { useGetUsers }