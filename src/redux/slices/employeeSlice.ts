import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EmployeeService from '../../services/EmployeeService';
import { Employee } from '../../models/Employee';



// Async Thunk để gọi API
export const fetchEmployees = createAsyncThunk('?page=2', async () => {
  const response = await EmployeeService.getAllEmployees();
  return response.data;
});

// Khởi tạo state ban đầu
interface EmployeeState {
    employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Tạo Slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export default employeeSlice.reducer;
