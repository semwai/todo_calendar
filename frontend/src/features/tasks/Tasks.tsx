import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTasks, setDate} from "./tasksSlice";
import styles from "./Tasks.module.css";

const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
export default function Tasks() {
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch()

    if (tasks.date == null)
        return <div/>

    return <div>
        <button className={styles.close} onClick={() => dispatch(setDate(null))}>X</button>
        <div>Задачи на {tasks.date.day} {monthNames[tasks.date.month]} {tasks.date.year}:</div>
    </div>
}