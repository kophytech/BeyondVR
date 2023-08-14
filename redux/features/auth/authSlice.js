import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// const user = JSON.parse(localStorage.getItem("user"));
// const user = JSON.parse(localStorage.getItem("user"));

const user = () => {
    if (typeof window !== 'undefined') {
        localStorage.getItem('user');
    }
}
// if (typeof window !== "undefined") {
//     user = localStorage.getItem("user") || ""
//   }

const initialState = {
    //check if user is logged in, if not, set to false
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    message: "",
};

//login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        console.log({ error });
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.user = action.payload.data;
                console.log(state.user)
                state.message = 'User logined successfully'
            })
            .addCase(login.rejected, (state, action) => {
                //   state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
        // .addCase(logout.fulfilled, (state) => {
        //   state.user = null;
        // });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;