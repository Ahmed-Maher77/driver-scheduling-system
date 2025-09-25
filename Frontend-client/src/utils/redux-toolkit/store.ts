import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import windowStatesReducer from "./windowStates";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        windowStates: windowStatesReducer,
    },
});

// To handle the useSelector, useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
