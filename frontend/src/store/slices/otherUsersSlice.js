import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOtherUsers = createAsyncThunk("fetchOtherUsers", async () => {
    const url = '/api/v1/users/'
    try {
        const response = await axios.get(url)
        // console.log('OtherUsers', response.data.data)

        const newRespone = response.data.data.map((item) => { // creating isSelected
            return {
                ...item,
                isSelected: false
            }
        })

        return newRespone
    } catch (error) {
        toast.error(error.response.data.message)
        console.log('Error in otherUserSlice ', error)
    }
})



const initialState = {
    isLoading: false,
    data: [],
    otherUserInfo: null,
    isError: false
}



const otherUserSlice = createSlice({
    name: "otherUser",
    initialState,
    reducers: {
        getUserInfo: ((state, action) => {
            const otherId= action.payload
            const cloneData = JSON.parse(JSON.stringify(state.data))
            state.otherUserInfo = cloneData.find((user) => user._id === otherId) 
        })
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOtherUsers.pending, (state, action) => {
            state.isLoading = true
            state.data = []
            state.isError = false
        }).addCase(fetchOtherUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.isError = false
        }).addCase(fetchOtherUsers.rejected, (state, action) => {
            console.log('Error in slice', action.error.message)
            state.isLoading = false
            state.data = []
            state.isError = true
        })
    }
})

export const { getUserInfo } = otherUserSlice.actions

export default otherUserSlice.reducer