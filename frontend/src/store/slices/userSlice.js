import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchInfo = createAsyncThunk("fetchInfo", async () => {
    const url = "/api/v1/auth/info"
    try {
        const response = await axios.get(url);
        // console.log('useFetched successful:', response.data.data);

        toast.success('Welcome ' + response.data.data.fullName)
        return response.data.data // important ha for action.payload
    } catch (error) {
        toast('Please Login!',
            {
                icon: '👏',
                style: {
                    borderRadius: '10px',   
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        throw error
    }
})


const initialState = {
    authStatus: false,
    data: null,
    isLoading: false,
    isError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            console.log('this one is working')
            state.data = null,
                state.authStatus = false
        },
        login: (state, action) => {
            console.log(`actionPayload login`, action)
            state.data = action.payload,
                state.authStatus = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.pending, (state, action) => {
            state.isLoading = true
            state.data = null
            state.authStatus = false
            state.isError = false
        }).addCase(fetchInfo.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.authStatus = true
            state.isError = false
        }).addCase(fetchInfo.rejected, (state, action) => {
            console.log('Error in slice', action.error)
            state.isLoading = false,
            state.data = null,
            state.authStatus = false
            state.isError = true;
        })
    }
});


export const { logout, login } = userSlice.actions

export default userSlice.reducer;