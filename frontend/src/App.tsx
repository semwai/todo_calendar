import React from 'react';
import './App.css';
import {Calendar} from "./features/calendar/Calendar";
import {useAppSelector} from "./app/hooks";
import {selectTasks} from "./features/tasks/tasksSlice";
import Tasks from "./features/tasks/Tasks";

function App() {
    const tasks = useAppSelector(selectTasks);

    if (tasks.date !== null) {
        return <Tasks/>
    } else return (
        <div className="App">
            <header className="App-header">
                <Calendar/>
            </header>
        </div>);
}

export default App;
