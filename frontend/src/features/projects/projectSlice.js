import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
    projects: [],
    project: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// create new project
export const createProject = createAsyncThunk(
    'projects/create',
    async (projectData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // this is a protected route -- need token to authorize
            return await projectService.createProject(projectData, token); // pass user data into register function located in authService.js
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

export const projectSlice = createSlice({
    name: 'project', // prefix for generated action types
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        //add all our cases
    },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
