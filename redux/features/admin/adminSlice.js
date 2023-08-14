import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
    classs: [],
    school: [],
    coursee: [],
    studentt: [],
    stats:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };


export const getStats = createAsyncThunk(
    "stats/getStats",
    async (_, thunkAPI) => {
      try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token)
        return await adminService.getStats();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        //this will be the payload if there is an error
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getSchool = createAsyncThunk(
    "stats/getSchool",
    async (_, thunkAPI) => {
      try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token)
        return await adminService.getSchool(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        //this will be the payload if there is an error
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getClass = createAsyncThunk(
    "classs/getClass",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.getClass(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        //this will be the payload if there is an error
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getCourse = createAsyncThunk(
    "coursee/getCourse",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.getCourse(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        //this will be the payload if there is an error
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getStudent = createAsyncThunk(
    "studentt/getStudent",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await adminService.getStudent(token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        //this will be the payload if there is an error
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getStats.pending, (state) => {
          state.isLoading = true;
          state.stats =  null
        })
        .addCase(getStats.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.stats = action.payload;
        })
        .addCase(getStats.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.stats = null;
        })
        .addCase(getSchool.pending, (state) => {
          state.isLoading = true;
          state.school =  null
        })
        .addCase(getSchool.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.school = action.payload;
        })
        .addCase(getSchool.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.school = null;
        })
        .addCase(getClass.pending, (state) => {
          state.isLoading = true;
          state.classs =  null
        })
        .addCase(getClass.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.classs = action.payload;
        })
        .addCase(getClass.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.classs = null;
        })
        .addCase(getCourse.pending, (state) => {
          state.isLoading = true;
          state.coursee =  null
        })
        .addCase(getCourse.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.coursee = action.payload;
        })
        .addCase(getCourse.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.coursee = null;
        })
        .addCase(getStudent.pending, (state) => {
          state.isLoading = true;
          state.studentt =  null
        })
        .addCase(getStudent.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.studentt = action.payload;
        })
        .addCase(getStudent.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.studentt = null;
        })
    },
  });

  export default adminSlice.reducer;
