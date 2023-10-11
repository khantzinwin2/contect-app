import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useGetSingleContactQuery } from "./contactApi";

export const authSlice = createSlice({
    name:"auth",
    initialState:{ user:null, token:null, name:null, phone:null, email:null },
    reducers:{
        addUser: (state, {payload})=> {
            console.log("from rtk", payload)
            state.user = payload.user;
            state.token = payload.token;
            Cookies.set("user",JSON.stringify(state.user),{expires: 10})
            Cookies.set("token",state.token,{expires: 10})
        },

        addContacts: (state, {payload})=>{
            console.log(payload)
            console.log(payload?.name)
            Cookies.set("name",payload?.name,{expires: 1})
            Cookies.set("phone",payload?.phone,{expires: 1})
            Cookies.set("email",payload?.email,{expires: 1})
        },

        removeContact:(state, {payload})=>{
            Cookies.remove("id")
            Cookies.remove("name")
            Cookies.remove("email")
            Cookies.remove("phone")
        }
       
    }
})

export const { addUser, addContacts, removeContact} = authSlice.actions;
export default authSlice.reducer;