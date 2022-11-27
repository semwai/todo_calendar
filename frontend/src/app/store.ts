import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer, {fetchDaysAsync} from '../features/calendar/calendarSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    calendar: calendarReducer
  },
});

const lastDate = { year: store.getState().calendar.year, month: store.getState().calendar.month}
store.subscribe(() => {
  const date = store.getState().calendar
  if (date.year != lastDate.year || date.month != lastDate.month) {
    lastDate.month = date.month
    lastDate.year = date.year
    store.dispatch(fetchDaysAsync({year: date.year, month: date.month}))
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
