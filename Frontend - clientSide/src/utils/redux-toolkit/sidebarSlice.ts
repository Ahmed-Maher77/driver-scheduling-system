import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SidebarState } from "../../common/Types/Interfaces";



const initialState: SidebarState = { activeBar: false, compressSidebar: false };

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setActiveBar: (state, action: PayloadAction<boolean>) => {
            state.activeBar = action.payload;
        },
        setCompressSidebar: (state, action: PayloadAction<boolean>) => {
            state.compressSidebar = action.payload;
        },
    },
});

export const { setActiveBar, setCompressSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
