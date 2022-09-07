import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserChange, IUserLogin} from "../models/IUser";
import type {RootState} from "../store/store";
import {userSlice} from '../store/reducers/UserSlice'
import {notifySlice} from '../store/reducers/NotifySlice'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        login: build.query<IUser[], IUserLogin>({
            query: (user) => ({
                url: `/users?email=${user.email}&password=${user.password}`,
                method: 'GET'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {login} = userSlice.actions;
                const {showNotify} = notifySlice.actions;
                try {
                    const {data} = await queryFulfilled;
                    if (data.length>0) {
                        dispatch(login(data[0]));
                        dispatch(showNotify({text:"Login successful!", type:"success"}));
                    } else dispatch(showNotify({text:"Email or password is incorrect. Try again", type:"error"}));
                } catch (err) {
                    dispatch(showNotify({text:`Problems with server. Check console.`, type:"error"}));
                }
            },
        }),
        register: build.mutation<null, IUserLogin>({
            async queryFn(user, queryApi, _extraOptions, fetchWithBQ) {
                const {showNotify} = notifySlice.actions;
                const {login} = userSlice.actions;
                try {
                    const checkUser: boolean = !((await fetchWithBQ(`/users?email=${user.email}`)).data as IUserLogin[]).length;
                    if(checkUser){
                        const {data} = await fetchWithBQ({
                            url: `/users`,
                            method: 'POST',
                            body: {...user}
                        });
                        queryApi.dispatch(showNotify({text:"Register successful!", type:"success"}));
                        queryApi.dispatch(login(data as IUser));
                    } else {
                        queryApi.dispatch(showNotify({text:"User with this email is already registered", type:"error"}));
                    }
                    return {data: null};
                } catch (err) {
                    queryApi.dispatch(showNotify({text:`Problems with server. Check console.`, type:"error"}));
                    return {
                        error: {
                            status: 500,
                            statusText: 'Internal Server Error',
                            data: err,
                        },
                    }
                }
            }
        }),
        changePassword: build.mutation<null, IUserChange>({
            async queryFn(user, queryApi, _extraOptions, fetchWithBQ) {
                const userId = (queryApi.getState() as RootState).user.id;
                const {showNotify} = notifySlice.actions;
                try {
                    const oldPassword: string = ((await fetchWithBQ(`/users/${userId}`)).data as IUserLogin).password;
                    if(oldPassword===user.oldPassword){
                        await fetchWithBQ({
                            url: `/users/${userId}`,
                            method: 'PATCH',
                            body: {
                                password: user.newPassword
                            }
                        });
                        queryApi.dispatch(showNotify({text:"Password changed successful!", type:"success"}));
                    } else {
                        queryApi.dispatch(showNotify({text:"The old password is incorrect!", type:"error"}));
                    }
                    return {data: null};
                } catch (err) {
                    queryApi.dispatch(showNotify({text:`Problems with server. Check console.`, type:"error"}));
                    return {
                        error: {
                            status: 500,
                            statusText: 'Internal Server Error',
                            data: err,
                        },
                    }
                }
            },
        })
    })
})