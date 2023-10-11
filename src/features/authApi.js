import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl:'https://contact-app.mmsdev.site/api/v1'}),
    tagTypes: ['contact'],
    endpoints:  (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['contact']
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['contact']
        }),

        logout: builder.mutation({
            query: (token) => ({
                url: "/user-logout",
                method: 'POST',
                headers: {authorization: ` Bearer ${token}`}
            }),
            invalidatesTags: ['contact']
        }),

        changePassword: builder.mutation({
            query: ({token,password}) => ({
                url: "/change-password",
                method: 'POST',
                body: password,
                headers: {authorization: ` Bearer ${token}`}
            }),
            invalidatesTags: ['contact']
        }),

        
    })
})

export const { useRegisterMutation ,useLoginMutation, useLogoutMutation, useChangePasswordMutation } = authApi;
