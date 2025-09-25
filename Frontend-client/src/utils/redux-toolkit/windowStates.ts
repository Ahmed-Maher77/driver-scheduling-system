import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WindowStates } from "../../common/Types/Interfaces";



const initialState: WindowStates = { isXLargeScreen: false };

const windowStatesSlice = createSlice({
    name: "windowStates",
    initialState,
    reducers: {
        setIsXLargeScreen: (state, action: PayloadAction<boolean>) => {
            state.isXLargeScreen = action.payload;
        },
    },
});

export const { setIsXLargeScreen } = windowStatesSlice.actions;
export default windowStatesSlice.reducer;
