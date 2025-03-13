import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userService } from "../../services/UserService";

interface UserState {
  token: string | null;
  email: string | null;
  error: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logoutUser: (state) => {
      state.token = null;
      state.email = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginApiAction.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.meta.arg.email;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.meta.arg.email);
      })
      .addCase(userLoginApiAction.rejected, (state, action) => {
        state.error = (action.payload as string) || "login failed";
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

// ...................................... THUNK ..........................................

export const userLoginApiAction = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await userService.userLogin(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed!");
    }
  }
);

export const userRegisterApiAction = createAsyncThunk(
  "user/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await userService.userRegister(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
