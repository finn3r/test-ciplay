import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserLogin} from "../models/IUser";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        login: build.query<IUser, IUserLogin>({
            query: (user) => ({
                url: `/users?email=${user.email}&pass=${user.password}`,
                method: 'GET'
            })
        }),
        register: build.mutation<IUser, IUserLogin>({
            query: (user) => ({
                url: `/users`,
                method: 'POST',
                body: {...user}
            })
        }),
        changePassword: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: {...user}
            })
        })
    })
})