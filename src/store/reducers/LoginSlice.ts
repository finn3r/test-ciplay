import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ILogin {
    email: string;
    password: string;
}

const initialState: ILogin = {
    email: "",
    password: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        changePassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        }
    }
})

export default loginSlice.reducer;