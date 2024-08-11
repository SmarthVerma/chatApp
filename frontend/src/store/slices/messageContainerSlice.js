import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


export const fetchMessage = createAsyncThunk("fetchMessage", async (convoId) => {
    const url = `/api/v1/messages/${convoId}`
    try {
        const response = await axios.get(url);
        // console.log('messagesFetched successful:', response.data.data);

        return response.data.data
    } catch (error) {
        toast.error(error.response.data.message)
        throw error
    }
})

const initialState = {
    isLoading: false,
    messages: [],
    sendingTo: '',
    to: '',
    isSelected: false,
    isError: false
}

const messageContainerSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        changeConversation: ((state, action) => {
            state.isSelected = true,
                state.sendingTo = action.payload._id
            state.to = action.payload.fullName
        }),
        setMessages: ((state, action) => {
            state.messages.push(action.payload) // message
        })

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessage.pending, (state, action) => {
            state.isLoading = true
            state.messages = null
            state.isError = false
        }).addCase(fetchMessage.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = action.payload
            state.isError = false
        }).addCase(fetchMessage.rejected, (state, action) => {
            console.log('Error in slice', action.error.message)
            state.isLoading = false,
                state.messages = null,
                state.isError = true;
        })
    },


})

export const { changeConversation, setMessages } = messageContainerSlice.actions

export default messageContainerSlice.reducer