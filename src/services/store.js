import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/authApi";
import authSlice from "../features/authSlice";
import { contactapi } from "../features/contactApi";

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]: authApi.reducer,
        [contactapi.reducerPath]: contactapi.reducer,
        authSlice: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactapi.middleware),
})
