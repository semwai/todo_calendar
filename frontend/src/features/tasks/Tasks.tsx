import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasksAsync, ITask, selectTasks, setDate, TaskStatus} from "./tasksSlice";
import styles from "./Tasks.module.css";
import {useEffect} from "react";
import {Spinner} from "../spinner/Spinner";


function Task(t: ITask) {
    return <div className={styles.task}>

        <div><input className={styles.checkbox} type="checkbox" checked={t.status === TaskStatus.Finished}/> {t.description}</div>
    </div>
}

const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
export default function Tasks() {
    const t = useAppSelector(selectTasks);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (t.date)
            dispatch(fetchTasksAsync(t.date))
    }, [t.date])
    if (t.date == null)
        return <div/>

    if (t.tasks == undefined || t.status === 'loading') {
        return <Spinner/>
    } else {
        return <div className={styles.tasks}>
            <button className={styles.close} onClick={() => dispatch(setDate(null))}>Назад</button>
            <div>Задачи на {t.date.day} {monthNames[t.date.month]} {t.date.year}:
                {t.tasks.map(t => <Task key={t.id} {...t}/>)}
            </div>
        </div>
    }
}

