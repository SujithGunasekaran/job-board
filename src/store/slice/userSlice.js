import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loggedInUser: {}
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateLoggedInUser: (state, action) => {
            state.loggedInUser = action?.payload ?? {}
        },
    }
});

export const { updateLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
