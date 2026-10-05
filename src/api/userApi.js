import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BACKEND_URL
    }),
    tagTypes:['users'],
    endpoints:(builder)=>({
        getUser:builder.query({
            query:()=>"",
            providesTags:["users"]
        }),
        getUserById:builder.query({
            query:(id)=> `/${id}`,
            providesTags:['users']
        }),
        createUser:builder.mutation({
            query:(user)=>({
                url:'',
                method:"POST",
                body:user
            }),
            invalidatesTags:['users']
        }),
        updateUser:builder.mutation({
            query:({id, ...user})=>({
                url:`/${id}`,
                method:"PATCH",
                body:user
            }),
            invalidatesTags:['users']
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["users"]
        }),
    }),
});
export const{
    useGetUserQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
}=userApi