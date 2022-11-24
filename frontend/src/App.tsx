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
            <header className="App-header">
                {tasks.date == null?<Calendar/>:<Tasks/>}
            </header>
        </div>);
}

export default App;
