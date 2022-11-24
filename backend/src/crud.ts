import {IDispatcher} from "./router";
import {MemoryTaskStorage} from "./storage";
import {TaskStatus} from "./models";

const taskStorage = new MemoryTaskStorage()
taskStorage.add({id: 1, date: new Date(), status: TaskStatus.Created, description: 'Пельмени сделать'})
taskStorage.add({id: 2, date: new Date(), status: TaskStatus.Created, description: 'Чай сделать'})


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

export function getUser(dispatcher: IDispatcher) {
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: 'GET user'
    })
}