import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileData: {
    name: "dummy name",
    role: "STUDENT"
  },
  userData: {},
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken") || null,
  idAccessToken: localStorage.getItem("idAccessToken") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfileData(state,action){
            state.userProfileData = action.payload;
        },
        setUserData(state,action){
            state.userData = action.payload;
        },
        setToken(state, action){
            state.accessToken = action.payload
        },
        setUserAuthentication(state,action){
            state.isAuthenticated = action.payload
        }
    }
})
export const {setUserProfileData, setUserData, setToken, setUserAuthentication} = userSlice.actions;
export default userSlice.reducer; 