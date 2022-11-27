import {IDispatcher} from "./router";
import {SqliteTaskStorage} from "./storage";
import {Task, TaskStatus} from "./models";
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('storage.db');
const taskStorage = new SqliteTaskStorage(db)


export function getTask(dispatcher: IDispatcher) {
    const id = Number(dispatcher.params['id'])
    taskStorage.get(id, (task) => {
        if (task) {
            dispatcher.response.writeHead(200, {'Content-Type': 'application/json'});
            dispatcher.response.json({
                task: task
            })
        } else {
            dispatcher.response.writeHead(404, {'Content-Type': 'application/json'});
            dispatcher.response.json({
                message: `task with id ${id} not found`
            })
        }
    })
}


export function getTasksByDate(dispatcher: IDispatcher) {
    taskStorage.getByDate(new Date(dispatcher.query.date as string), (tasks) => {
        dispatcher.response.writeHead(200, {'Content-Type': 'application/json'});
        dispatcher.response.json({
            tasks: tasks
        })
    })
}

export function postTask(dispatcher: IDispatcher) {

    if (dispatcher.body === undefined) {
        dispatcher.response.writeHead( 400, {'Content-Type':'application/json'});
        dispatcher.response.json({
            message: "empty body"
        } )
        return
    }

    const task: Task = {
        date: new Date(dispatcher.body['date']),
        description: dispatcher.body['description'],
        status: TaskStatus.Created,
        id: 0
    }

    const newTask = taskStorage.add(task)
    console.log(newTask)
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: newTask
    } )
}

export function getUser(dispatcher: IDispatcher) {
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: 'GET user'
    })
}
