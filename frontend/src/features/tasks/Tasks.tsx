import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasksAsync, selectTasks, setDate} from "./tasksSlice";
import styles from "./Tasks.module.css";
import {useEffect} from "react";
import {Spinner} from "../spinner/Spinner";
import {Task} from "./Task";
import {NewTask} from "./NewTask";


const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
export default function Tasks() {
    const t = useAppSelector(selectTasks);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (t.date)
            dispatch(fetchTasksAsync(t.date))
    }, [t.date])
    if (t.date === null)
        return <div/>

    if (t.tasks === undefined || t.status === 'loading') {
        return <Spinner/>
    } else {
        return <div className={styles.tasks}>
            <div className={styles.head}>Задачи на {t.date.day} {monthNames[t.date.month]} {t.date.year}
                <button className={styles.close} onClick={() => dispatch(setDate(null))}>Закрыть</button>
            </div>
            {t.tasks.map(t => <Task key={t.id} {...t}/>)}
            <NewTask/>
        </div>
    }
}

