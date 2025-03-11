import { createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../models/Employee";
const initialState: Employee[] = []

const EmployeeSlice = createSlice({
    name: 'Employee',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.push(action.payload)
        },
        removeEmployee: (state, action) => {
            return state.filter(emp => emp.id !== action.payload)
        }
    }
})

export const { addEmployee, removeEmployee } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;