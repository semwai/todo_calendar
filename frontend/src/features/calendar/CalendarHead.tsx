import {Dispatch, SetStateAction} from "react";
import styles from "./Calendar.module.css";

export default function CalendarHead({year, month, setYear, setMonth}: {
    year: number, month: number, setYear: Dispatch<SetStateAction<number>>, setMonth: Dispatch<SetStateAction<number>>;
}) {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    // согласно содержимому базы https://www.isdayoff.ru/db/
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const m = monthNames.map((v, i) => <option selected={i === month} key={i} value={i}>{v}</option>)
    return <div>
        <select className={styles.select} onChange={event => setMonth(Number(event.target.value))}>
            {m}
        </select>
        <select className={styles.select} onChange={event => setYear(Number(event.target.value))}>
            {years.map(value => <option key={value} selected={value===year} value={value}>{value}</option>)}
        </select>
    </div>
}