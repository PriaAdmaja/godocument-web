"use client"
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        name: null,
        avatar: null
    },
    reducers: {
        submitToken: (prevState, action) => {
            return {
                ...prevState,
                token: action.payload
            }
        },
        submitName: (prevState, action) => {
            return {
                ...prevState,
                name: action.payload
            }
        },
        submitAvatar: (prevState, action) => {
            return {
                ...prevState,
                avatar: action.payload
            }
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                name: null,
                token: null,
                avatar: null
            }
        }
    }
})

export const userAction = userSlice.actions;
export default userSlice.reducer;