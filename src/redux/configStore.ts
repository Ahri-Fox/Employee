import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import userReducer from "./slices/userSlice";
import loadingReducer from "./slices/loadingSlice";
const store = configureStore({
  reducer: {
    employees: employeeReducer,
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
