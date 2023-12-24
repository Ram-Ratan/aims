import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileData: {},
  user: {},
  isAuthenticated: false,
  authToken: JSON.parse(localStorage.getItem("authToken")) || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfileData(state,action){
            state.userProfileData = action.payload;
        },
        setUserData(state,action){
            state.user = action.payload;
        },
        setToken(state, action){
            state.authToken = action.payload
        },
        setUserAuthentication(state,action){
            state.isAuthenticated = action.payload
        }
    }
})
export const {setUserProfileData, setUserData, setToken, setUserAuthentication} = userSlice.actions;
export default userSlice.reducer; 