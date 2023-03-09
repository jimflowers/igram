import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// register new user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user); // pass user data into register function located in authService.js
            // use the xtra reducers - build case to handle the various actions
        } catch (error) {
            // when something goes wrong get message from backend
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // read thunkAPI docs
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// login user

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user); // pass user data into register function located in authService.js
    // use the xtra reducers - build case to handle the various actions
} catch (error) {
    // when something goes wrong get message from backend
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

    // read thunkAPI docs
    return thunkAPI.rejectWithValue(message);
}
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async()=> {
  await authService.logout()
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
              state.user = null
              
          });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
