import {IDispatcher} from "./router";
import {MemoryTaskStorage} from "./storage";
import {Task, TaskStatus} from "./models";

const taskStorage = new MemoryTaskStorage()
taskStorage.add({id: 1, date: new Date(), status: TaskStatus.Created, description: 'Пельмени сделать'})
taskStorage.add({id: 2, date: new Date(), status: TaskStatus.Created, description: 'Чай сделать'})
taskStorage.add({id: 3, date: new Date("2022-11-01"), status: TaskStatus.Created, description: 'Чай выпить'})


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
    console.log(dispatcher.query)
    let tasks: Task[]
    if (dispatcher.query.date)
        tasks = taskStorage.getByDate(new Date(dispatcher.query.date))
    else
        tasks = taskStorage.getByDate(new Date()) // сегодня
    dispatcher.response.writeHead(200, {'Content-Type': 'application/json'});
    dispatcher.response.json({
        tasks: tasks
    })
}

export function getUser(dispatcher: IDispatcher) {
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: 'GET user'
    })
}
