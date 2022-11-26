import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTasks} from "./taskApi";

export interface IDate{
    day: number
    month: number
    year: number
}

export enum TaskStatus {
    Created,
    Finished
}

export interface ITask {
    id: number
    description: string
    date: Date
    status: TaskStatus

}
export interface TasksState {
    date: IDate | null // текущаю открытая дата
    tasks: ITask[],
    status: string
}

const initialState: TasksState = {
    date: null,
    tasks: [],
    status: 'idle'
};

export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchTasks',
    async (date: IDate) => {
        return await fetchTasks(date);
    }
);

export const tasksSlice = createSlice({
    name: 'calendar',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDate: (state, action: PayloadAction<IDate | null>) => {
            state.date = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksAsync.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setDate } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;