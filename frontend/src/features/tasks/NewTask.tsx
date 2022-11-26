import styles from "./Tasks.module.css";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {fetchAddTasksAsync, ITask, TaskStatus} from "./tasksSlice";

export function NewTask() {

    const [description, setDescription] = useState('')
    const dispatch = useAppDispatch()

    const add = () => {
        const task: ITask = {
            id: 132,
            description: description,
            status: TaskStatus.Created,
            date: new Date()
        }
        dispatch(fetchAddTasksAsync(task))
    }

    return <div className={styles.task}>

        <div>
            <div className={styles.checkboxContainer}></div>
            <input className={styles.input} type="text"
                   value={description}
                   placeholder="Добавить задачу"
                   onChange={e => {
                       setDescription(e.target.value)
                   }}/>
            <input className={styles.changeButton} type='button' value='Добавить' onClick={add}/>
        </div>
    </div>
}