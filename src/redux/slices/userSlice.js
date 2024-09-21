import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: null,
        friends: [],
        friendRequests: [],
    },
    reducers: {
        setAuthUsers: (state, action) => {
            state.users = action.payload;
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setFriendsReq: (state, action) => {
            state.friendRequests = action.payload;
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
            state.friendRequests = state.friendRequests.filter(req => req._id !== action.payload._id);
        },
    },
});

export const { setAuthUsers, setFriends, setFriendsReq, addFriend } = userSlice.actions;
export default userSlice.reducer;
