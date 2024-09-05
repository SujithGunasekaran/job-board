import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    userInfo: {}
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setIsUserAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        addUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
});

export const { setIsUserAuthenticated, addUserInfo } = userSlice.actions;

export default userSlice.reducer;
