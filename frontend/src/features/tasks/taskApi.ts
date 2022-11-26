import {IDate, ITask} from "./tasksSlice";


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