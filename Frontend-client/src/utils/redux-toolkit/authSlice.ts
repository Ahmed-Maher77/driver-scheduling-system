import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
    username: string;
    email: string;
    name: string;
    role: string;
}

export interface AuthState {
    token: string | null;
    user: UserInfo | null;
    isAuthenticated: boolean;
}

const token = localStorage.getItem("admin_token");
const userStr = localStorage.getItem("admin_user");
let user: UserInfo | null = null;
if (userStr) {
    try {
        user = JSON.parse(userStr);
    } catch (e) {
        localStorage.removeItem("admin_user");
    }
}

const initialState: AuthState = {
    token,
    user,
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: UserInfo }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("admin_token", action.payload.token);
            localStorage.setItem("admin_user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
