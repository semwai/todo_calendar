import {Task} from "./models";

interface TaskStorage {
    add(t: Task): void
    get(id: number): Task | undefined
    getByDate(date: Date): Task | undefined

}

export class MemoryTaskStorage implements TaskStorage{
    private store: Task[] = []

    add(t: Task) {
        if (this.store.find(task => task.id === t.id)) {
            throw Error(`task with ${t.id} already exist`)
        }
        this.store = [...this.store, t]
    }

    get(id: number): Task | undefined {
        return this.store.find(task => task.id === id)
    }

    getByDate(date: Date): Task | undefined {
        // todo
        return
    }
}