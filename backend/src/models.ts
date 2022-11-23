export enum TaskStatus {
    Created,
    Finished
}

export class Task {
    readonly id: number
    description: string
    date: Date
    status: TaskStatus

    constructor(id: number, description: string, date: Date, status: TaskStatus) {
        this.id = id
        this.description = description
        this.date = date
        this.status = status
    }
}