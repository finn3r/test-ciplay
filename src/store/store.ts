import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userAPI} from "../services/UserService";
import userReducer from "./reducers/UserSlice";
import notifyReducer from "./reducers/NotifySlice";
import loginReducer from "./reducers/LoginSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    notify: notifyReducer,
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']