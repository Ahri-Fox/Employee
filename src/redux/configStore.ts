import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
