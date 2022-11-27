import React from 'react';
import './App.css';
import {Calendar} from "./features/calendar/Calendar";
import {useAppSelector} from "./app/hooks";
import {selectTasks} from "./features/tasks/tasksSlice";
import Tasks from "./features/tasks/Tasks";

function App() {
    const tasks = useAppSelector(selectTasks);

    return (
        <div className="App">
            {tasks.date == null?
                <header className="App-header">
                    <Calendar/>
                </header>:
                <header className="App-header calendar">
                    <Tasks/>
                </header>}
        </div>);
}

export default App;
