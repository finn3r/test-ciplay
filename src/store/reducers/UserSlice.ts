import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";

const initialState: IUser = {
    id: 0,
    email: "",
    isAuth: false
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            Object.assign(state, {...action.payload, isAuth: true});
        }
    }
})

export default userSlice.reducer;