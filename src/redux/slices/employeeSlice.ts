import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../models/Employee";
import { employeeService } from "../../services/EmployeeService";

interface EmployeeState {
  employees: Employee[];
}
// Trạng thái ban đầu
const initialState: EmployeeState = {
  employees: [],
};

// Tạo Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeesAction: (state, action) => {
      state.employees = action.payload;
    },
    addEmployeeAction: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload); // Thêm nhân viên mới vào Redux
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployeesApiAction.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});
export const { setEmployeesAction, addEmployeeAction } = employeeSlice.actions;
export default employeeSlice.reducer;

// ...................................... THUNK ..........................................
//Thunk lấy danh sách nhân viên
export const getAllEmployeesApiAction = createAsyncThunk(
  "employees/getAllEmployeesApiAction",
  async () => {
    const response = await employeeService.getListEmployee();
    return response;
  }
);
