import {Task} from "./models";
import {Database} from "sqlite3";

interface TaskStorage {
    add(t: Task): Task
    get(id: number, callback: (task: Task | undefined) => void): void
    getByDate(date: Date, callback: (tasks: Task[]) => void): void

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

    get(id: number, callback: (task: Task | undefined) => void) {
        callback(this.store.find(task => task.id === id))
    }

    getByDate(date: Date, callback: (tasks: Task[]) => void) {
        // Все даты с точностью до дня
        callback(
            this.store.filter(task => task.date.toLocaleDateString() === date.toLocaleDateString())
        )
    }
}


export class SqliteTaskStorage implements TaskStorage{
    private db: Database

    constructor(db: Database) {
        this.db = db
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY, description TEXT, status INTEGER, date TEXT)")
        })
    }

    add(t: Task): Task {
        this.db.run(
            "INSERT INTO Task (description, status, date) values(?, ?, ?)",
            [t.description, t.status, t.date.toLocaleDateString()],
            (err) => {
                if (err)
                    throw err
            })
        return t
    }

    get(id: number, callback: (task: Task | undefined) => void) {
        let task: Task | undefined = undefined
        this.db.all("SELECT * FROM Task WHERE id = ?", [id], (err, data) => {
            const first = data[0]
            task = new Task(first.id, first.description, new Date(first.date), first.status)
            callback(task)
        })
    }

    getByDate(date: Date, callback: (tasks: Task[]) => void) {
        // Все даты с точностью до дня
        let tasks: Task[] = []
        this.db.all("SELECT * FROM Task WHERE Date = ?", [date.toLocaleDateString()], (err, data) => {
            data.forEach(row => {
                tasks.push(new Task(row.id, row.description, new Date(row.date), row.status))
            })
            callback(tasks)
        })
    }
}