import {IDate, INewTask, ITask} from "./tasksSlice";


export function fetchTasks(date: IDate) {
    return new Promise<ITask[]>(async (resolve, reject) => {
        const res = await fetch(`/tasks/?date=${date.year}-${date.month+1}-${date.day}`)
        if (res.status !== 200) {
            reject(res.statusText)
        }
        const data = await res.json()
        resolve(data.tasks)
    })
}

export function fetchAddTask(task: INewTask) {
    return new Promise<ITask>(async (resolve, reject) => {

        const res = await fetch('/task', {
            method: 'POST',
            body: JSON.stringify({
                description: task.description,
                date: `${task.date.year}-${task.date.month+1}-${task.date.day}`
            })
        })
        if (res.status !== 200) {
            reject(res.statusText)
        }
        const data = await res.json()
        resolve(data.task)
    })
}