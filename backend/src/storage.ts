import {Task} from "./models";

interface TaskStorage {
    add(t: Task): void
    get(id: number): Task | undefined
    getByDate(date: Date): Task[]

}

export class MemoryTaskStorage implements TaskStorage{
    private store: Task[] = []
    private lastId = 0
    add(t: Task): Task {
        if (t.id !== 0 && this.store.find(task => task.id === t.id)) {
            throw Error(`task with ${t.id} already exist`)
        }
        if (t.id === 0) {
            const nt = {...t, id: this.lastId}
            this.store = [...this.store, nt]
            this.lastId += 1
            return nt
        } else {
            this.store = [...this.store, t]
            return t
        }

    }

    get(id: number): Task | undefined {
        return this.store.find(task => task.id === id)
    }

    getByDate(date: Date): Task[] {
        // Все даты с точностью до дня
        return this.store.filter(task => task.date.toLocaleDateString() === date.toLocaleDateString())
    }
}