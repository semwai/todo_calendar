import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface IDate{
    day: number
    month: number
    year: number
}
export interface TasksState {
    date: IDate | null
}

const initialState: TasksState = {
    date: null
};


export const tasksSlice = createSlice({
    name: 'calendar',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDate: (state, action: PayloadAction<IDate | null>) => {
            state.date = action.payload
        },
    },
});

export const { setDate } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;