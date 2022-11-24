import styles from "./Calendar.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCalendar, setMonth, setYear} from "./calendarSlice";

export default function CalendarHead() {
    const calendar = useAppSelector(selectCalendar);
    const dispatch = useAppDispatch();

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    // согласно содержимому базы https://www.isdayoff.ru/db/
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const m = monthNames.map((v, i) => <option key={i} value={i}>{v}</option>)
    return <div>
        <select className={styles.select} value={calendar.month} onChange={event => dispatch(setMonth(Number(event.target.value)))}>
            {m}
        </select>
        <select className={styles.select} value={calendar.year} onChange={event => dispatch(setYear(Number(event.target.value)))}>
            {years.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
    </div>
}