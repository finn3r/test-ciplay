import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const NotifyVariants = ["error", "success"] as const;

interface INotify {
    text: string;
    type: typeof NotifyVariants[number] | null;
}

const initialState: INotify = {
    text: "",
    type: null
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        showNotify(state, action: PayloadAction<INotify>) {
            Object.assign(state, action.payload);
        },
        hideNotify(state) {
            Object.assign(state, initialState);
        }
    }
})

export default notifySlice.reducer;