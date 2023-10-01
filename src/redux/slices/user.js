"use client"
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        name: null,
        avatar: null,
        id: null,
        email: null,
        role: null
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
        submitId: (prevState, action) => {
            return {
                ...prevState,
                id : action.payload
            }
        },
        submitRole: (prevState, action) => {
            return {
                ...prevState,
                role: action.payload
            }
        },
        submitEmail: (prevState, action) => {
            return {
                ...prevState,
                email: action.payload
            }
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                name: null,
                token: null,
                avatar: null,
                id: null,
                email: null,
                role: null
            }
        }
    }
})

export const userAction = userSlice.actions;
export default userSlice.reducer;