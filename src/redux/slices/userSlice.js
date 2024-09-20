import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users : null,
        friends: []
    },
    reducers: {
        setAuthUsers: (state, action) => {
            state.users = action.payload;
        },
        setFriends : (state, action) => {
            state.friends = action.payload;
        }
    }
})

export const { setAuthUsers , setFriends } = userSlice.actions;
export default userSlice.reducer;