import { compose, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/types'
import axios from 'axios'

const Url = "http://localhost:3000/api"

interface UserStateType {
    error: string | null,
    status: string | null,
    user: IUser | null
}

const initialState: UserStateType = {
    error: null,
    status: "idle",
    user: null
}

export const loginUser = createAsyncThunk(
    
    "login/User",
    async (user: IUser, thunkAPI) => {
        try {
            const response = await axios.post(`${Url}/login`, {
                user
            });
            const { ResUser, success, message, token }: { ResUser: IUser, success: string, message: string, token: string } = response.data;
            
            localStorage.setItem("token", token);
            return { ResUser, success, message };

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const registerUser = createAsyncThunk(
    "register/User",
    async (user: IUser, thunkAPI) => {
        try {
            const response = await axios.post(`${Url}/register`, {
                user
            });
            const { newUser, success }: { newUser: IUser, success: boolean } = response.data;
            return { user: newUser, success: success };
        }
        catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(!action.payload.success){
                state.error = action.payload.message
                state.status = "failed";
                return
            }
            state.status = "success";
            
            state.user = action.payload.ResUser
            console.log(state.user);
            
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message!
            console.log(" from state",action.error.message);
            
        });
        builder.addCase(registerUser.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.status = "success";
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer