import {IDispatcher} from "./router";
import {MemoryTaskStorage} from "./storage";
import {Task, TaskStatus} from "./models";

const taskStorage = new MemoryTaskStorage()
taskStorage.add({id: 0, date: new Date(), status: TaskStatus.Created, description: 'Пельмени сделать'})
taskStorage.add({id: 0, date: new Date(), status: TaskStatus.Created, description: 'Чай сделать'})
taskStorage.add({id: 0, date: new Date("2022-11-01"), status: TaskStatus.Created, description: 'Чай выпить'})


export function getTask(dispatcher: IDispatcher) {
    const id = Number(dispatcher.params['id'])
    const task = taskStorage.get(id)
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
}


export function getTasksByDate(dispatcher: IDispatcher) {
    let tasks: Task[]
    if (dispatcher.query.date)
        tasks = taskStorage.getByDate(new Date(dispatcher.query.date as string))
    else
        tasks = taskStorage.getByDate(new Date()) // сегодня
    dispatcher.response.writeHead(200, {'Content-Type': 'application/json'});
    dispatcher.response.json({
        tasks: tasks
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
