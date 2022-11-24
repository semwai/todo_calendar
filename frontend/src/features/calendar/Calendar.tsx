import styles from './Calendar.module.css';
import {useEffect, useState} from "react";
import CalendarHead from "./CalendarHead";

interface IDay {
    num: number // номер дня
    holiday: boolean // выходной ли
    today?: boolean
}

const emptyDay = {
    num: 0, holiday: false
}

function twoDimensional<T>(arr: T[], size: number): T[][] {
    let res = [];
    for (let i = 0; i < arr.length; i = i + size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}

function Day({num, holiday, today}: IDay) {
    if (num === 0) {
        return <></>
    }
    if (today) {
        return <div className={styles.today}>{num}</div>
    } else if (holiday) {
        return <div className={styles.holiday}>{num}</div>
    } else {
        return <div>{num}</div>
    }
}

export function Calendar() {

    let [table, setTable] = useState<IDay[][]>([[], [], [], [], [], []])
    const now = new Date();
    let [y, setY] = useState(now.getFullYear())
    let [m, setM] = useState(now.getMonth())
    let [d, setD] = useState(now.getDate())

    useEffect(() => {
        const fetchData = async () => {
            const days: IDay[] = []
            const offset = new Date(y, m, 0).getDay() // с какого дня недели начинаем счет
            const res = await fetch(`https://isdayoff.ru/api/getdata?year=${y}&month=${m + 1}`) // месяц тут с 1
            const holidays = (await res.text()).split('').map(s => s === '1')
            for (let i = 0; i < offset; i++) days.push(emptyDay)
            for (let i = 0; i < holidays.length; i++) {
                const dayOffset = i + 1
                if (dayOffset === now.getDate() && m === now.getMonth() && y === now.getFullYear()) {
                    days.push({num: dayOffset, holiday: holidays[i], today: true})
                } else
                    days.push({num: dayOffset, holiday: holidays[i]})
            }
            return twoDimensional(days, 7)
        }
        console.log(m)
        fetchData().then(m => setTable(m))
    }, [y, m, d])

    return <div><CalendarHead year={y} month={m} setYear={setY} setMonth={setM}/>
        <table className={styles.calendar}>
            <thead>
            <tr>
                <th>П</th>
                <th>В</th>
                <th>С</th>
                <th>Ч</th>
                <th>П</th>
                <th>С</th>
                <th>В</th>
            </tr>
            </thead>
            <tbody>
            {[0, 1, 2, 3, 4].map(i => <tr>
                {table[i].map(d => <td><Day {...d}/></td>)}
            </tr>)}

            </tbody>
        </table>
    </div>
}
