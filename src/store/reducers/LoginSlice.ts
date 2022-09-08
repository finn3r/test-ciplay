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
        setState(state, action: PayloadAction<ILogin>) {
            Object.assign(state, action.payload)
        }
    }
})

export default loginSlice.reducer;