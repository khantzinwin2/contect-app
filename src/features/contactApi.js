import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactapi = createApi({
    reducerPath: 'contactapi',
    baseQuery: fetchBaseQuery({baseUrl:'https://contact-app.mmsdev.site/api/v1'}),
    tagTypes: ["contact"],
    endpoints:  (builder) => ({
        getContact: builder.query({
            query: (token) => ({
                url: "/contact",
                method: 'GET',
                headers: {authorization: ` Bearer ${token}`},
            }),
            providesTags: ["contact"]
        }),

        getSingleContact: builder.query({
            query: ({id,token}) => ({
                url: `/contact/${id}`,
                method: 'GET',
                headers: {authorization: ` Bearer ${token}`},
            }),
            providesTags: ["contact"]
        }),

        deleteContact: builder.mutation({
            query: ({token,id}) => ({
                url: `/contact/${id}`,
                method: 'DELETE',
                body: id,
                headers: {authorization: ` Bearer ${token}`},
            }),
            invalidatesTags: ["contact"]
        }),

        
        createContact: builder.mutation({
            query: ({token,contact}) => ({
                url: `/contact`,
                method: 'POST',
                body: contact,
                headers: {authorization: ` Bearer ${token}`},
            }),
            invalidatesTags: ["contact"]
        }),

        updateContact: builder.mutation({
            query: ({token,contact,id}) => ({
                url: `/contact/${id}`,
                method: `PUT`,
                body: contact,
                headers: {authorization: ` Bearer ${token}`},
            }),
            invalidatesTags: ["contact"]
        })
        
    })
})

export const { useGetContactQuery, useDeleteContactMutation, useCreateContactMutation, useUpdateContactMutation, useGetSingleContactQuery } = contactapi;
