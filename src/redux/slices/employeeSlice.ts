import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployeesApiAction.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(createEmployeeApiAction.fulfilled, (state, action) => {
      console.log("API Response:", action.payload);
    });
    builder.addCase(deleteEmployeeApiAction.fulfilled, (state, action) => {
      console.log("📌 Deleted Employee ID:", action.payload);
    });
  },
});
export const { setEmployeesAction } = employeeSlice.actions;
export default employeeSlice.reducer;

// ...................................... THUNK ..........................................
//Thunk lấy danh sách nhân viên
export const getAllEmployeesApiAction = createAsyncThunk(
  "employees/getAllEmployees",
  async (page: number) => {
    const response = await employeeService.getListEmployee(page);
    return response;
  }
);

export const createEmployeeApiAction = createAsyncThunk(
  "employees/createEmployee",
  async (data: { name: string; job: string }, { rejectWithValue }) => {
    try {
      const response = await employeeService.createEmployee(data);
      console.log("📌 API Response:", response);

      return response;
    } catch (error) {
      console.error("🚨 API Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployeeApiAction = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number, { rejectWithValue }) => {
    try {
      await employeeService.deleteEmployee(id);
      console.log(`🔥 Deleting Employee: ${id}`);
      return id;
    } catch (error) {
      console.error("🚨 API Delete Error:", error);
      return rejectWithValue(error);
    }
  }
);
