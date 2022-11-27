import styles from "./Tasks.module.css";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAddTasksAsync, INewTask, selectTasks} from "./tasksSlice";

export function NewTask() {
    const t = useAppSelector(selectTasks)
    const [description, setDescription] = useState('')
    const dispatch = useAppDispatch()

    const add = () => {
        const task: INewTask = {
            description: description,
            date: t.date!!
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