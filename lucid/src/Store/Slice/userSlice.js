import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
    isAuthenticated: false,
    errorMessage: "",
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(RegisterUser.pending, (state, action) => {
        state.errorMessage = "";
        state.status = STATUSES.LOADING;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
          state.errorMessage = action.payload.message;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
          state.errorMessage = "";
        }
        state.data = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = {};
        state.errorMessage = action.payload.message;
      })
      .addCase(LogInUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.errorMessage = "";
      })
      .addCase(LogInUser.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.status = STATUSES.ERROR;
          state.data = {};
          state.isAuthenticated = false;
          state.errorMessage = action.payload.message;
        } else {
          state.data = action.payload;
          state.isAuthenticated = true;
          state.status = STATUSES.SUCCESS;
          state.errorMessage = "";
        }
      })
      .addCase(LogInUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.data = {};
        state.isAuthenticated = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(FetchProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.errorMessage = "";
      })
      .addCase(FetchProfile.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.status = STATUSES.ERROR;
          state.data = {};
          state.isAuthenticated = false;
          state.errorMessage = action.payload.message;
        } else {
          state.data = action.payload;
          state.isAuthenticated = true;
          state.status = STATUSES.SUCCESS;
          state.errorMessage = "";
        }
      })
      .addCase(FetchProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.data = {};
        state.isAuthenticated = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(LogoutUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.errorMessage = "";
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.status = STATUSES.ERROR;
          state.errorMessage = action.payload.message;
        } else {
          state.isAuthenticated = false;
          state.data = {};
          state.status = STATUSES.SUCCESS;
          state.errorMessage = "";
        }
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.errorMessage = action.payload.message;
      })
      .addCase(UpdateProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.errorMessage = "";
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.status = STATUSES.ERROR;
          state.errorMessage = action.payload.message;
        } else {
          state.status = STATUSES.SUCCESS;
          state.data = action.payload;
          state.isAuthenticated = true;
          state.errorMessage = "";
        }
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.errorMessage = action.payload.message;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.errorMessage = "";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.status = STATUSES.ERROR;
          state.errorMessage = action.payload.message;
        } else {
          state.data = action.payload;
          state.status = STATUSES.success;
          state.errorMessage = "";
          state.isAuthenticated = true;
        }
      });
  },
});

export const RegisterUser = createAsyncThunk("RegisterUser", async (myForm) => {
  myForm.forEach((item) => console.log(item));
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const { data } = await axios.post(`/register`, myForm, config);
  console.log(data);
  return data;
});
export const LogInUser = createAsyncThunk(
  "LogInUser",
  async ({ loginEmail, loginPassword }) => {
    console.log(loginEmail, loginPassword);
    const { data } = await axios.post("/login", {
      email: loginEmail,
      password: loginPassword,
    });
    return data;
  }
);
export const FetchProfile = createAsyncThunk("FetchProfile", async () => {
  const { data } = await axios.get("/me");
  return data;
});
export const LogoutUser = createAsyncThunk("LogoutUser", async () => {
  const { data } = await axios.get("/logout");
  return data;
});
export const UpdateProfile = createAsyncThunk(
  "UpdateProfile",
  async (myForm) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put("/me/update", myForm, config);

    return data;
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (myForm) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.patch("/password/update", myForm, config);

    return data;
  }
);
export default userSlice.reducer;
