import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "./slices/employeeSlice";
export const store = configureStore({
    reducer: {
        Employee: EmployeeReducer,
    },
})