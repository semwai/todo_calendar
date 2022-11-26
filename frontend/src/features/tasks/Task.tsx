import {ITask, TaskStatus} from "./tasksSlice";
import {useEffect, useState} from "react";
import styles from "./Tasks.module.css";

export function Task(t: ITask) {

    const [status, setStatus] = useState(t.status)
    const [description, setDescription] = useState(t.description)
    const [changed, setChanged] = useState(false) // изменен ли элемент

    useEffect(() => {
        // кнопка сохранить только если данные изменены
        setChanged(status !== t.status || description !== t.description)
    }, [status, description, t.description, t.status])

    return <div className={styles.task}>

        <div>
            <div className={styles.checkboxContainer}>
                <input className={styles.checkbox} type="checkbox"
                       checked={status === TaskStatus.Finished}
                       onChange={e => {
                           setStatus(e.target.checked? TaskStatus.Finished:TaskStatus.Created)
                       }}/>
            </div>
            <input className={styles.input} type="text"
                   value={description}
                   onChange={e => {
                       setDescription(e.target.value)
                   }}/>
            {changed?<input className={styles.changeButton} type='button' value='Сохранить'/>:<></>}
        </div>
    </div>
}