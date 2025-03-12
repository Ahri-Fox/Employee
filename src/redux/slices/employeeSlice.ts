import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';
import { employeeService } from '../../services/EmployeeService';


interface EmployeeState {
  employees: Employee[];
}
// Trạng thái ban đầu
const initialState: EmployeeState = {
  employees: [],
};

// Tạo Slice
const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeesAction: (state, action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllEmployeesApiAction.fulfilled, (state, action) => { 
      state.employees = action.payload;
    });
  },
});
export const { setEmployeesAction } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;


export const getAllEmployeesApiAction = createAsyncThunk(
  "employees/getAllEmployeesApiAction",
  async () => {
    const response = await employeeService.getListEmployee();
    return response;
  }
);
