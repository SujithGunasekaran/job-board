import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';

const store = configureStore({
    reducer: {
        userReducer: userSlice
    }
});

export default store;
