"use client"
import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user';

const reducers = combineReducers({
    user: userSlice
});

export default reducers;