import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface CalendarState {
    day: number
    month: number
    year: number
}

const initialState: CalendarState = {
    day: (new Date).getDate(),
    month: (new Date).getMonth(),
    year: (new Date).getFullYear()
};

export interface IDay {
    num: number // номер дня
    holiday: boolean // выходной ли
    today?: boolean
}

export const emptyDay = {
    num: 0, holiday: false
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDay: (state, action: PayloadAction<number>) => {
            state.day = action.payload
        },
        setMonth: (state, action: PayloadAction<number>) => {
            state.month = action.payload
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload
        }
    },
});

export const { setDay, setMonth, setYear } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;