import styles from './Calendar.module.css';
import {useEffect, useState} from "react";

interface IDay {
    num: number // номер дня
    holiday: boolean // выходной ли
    today?: boolean
}

const emptyDay = {
    num: 0, holiday: false
}

function twoDimensional<T>(arr: T[], size: number): T[][]
{
    let res = [];
    for(let i=0;i < arr.length;i = i+size)
        res.push(arr.slice(i,i+size));
    return res;
}

function CalendarHead() {
    return <div>November - 2022</div>
}
function Day({num, holiday, today}: IDay) {
    if (num == 0) {
        return <></>
    }
    if (today)
        return <div className={styles.today}>{num}</div>
    else if (holiday)
        return <div className={styles.holiday}>{num}</div>
    else
        return <div>{num}</div>
}

export function Calendar() {

    let [month, setMonth] = useState<IDay[][]>([[],[],[],[],[],[]])

    useEffect(() => {
        const fetchData = async () => {
            const days: IDay[] = []
            const now = new Date();
            const y = now.getFullYear()
            const m = now.getMonth()
            const d = now.getDate()
            const offset = new Date(y, m, 0).getDay() // с какого дня недели начинаем счет
            const res = await fetch(`https://isdayoff.ru/api/getdata?year=${y}&month=${m + 1}`) // месяц тут с 1
            const holidays = (await res.text()).split('').map(s => s === '1')

            for (let i = 0; i < offset; i++)
                days.push(emptyDay)
            for (let i = 0; i < holidays.length; i++){
                const dayOffset = i + offset
                if (dayOffset == d)
                    days.push({num: dayOffset, holiday: holidays[i], today: true})
                else
                    days.push({num: dayOffset, holiday: holidays[i]})
            }

            return twoDimensional(days, 7)
        }
        fetchData().then(m => setMonth(m))
    }, [])

    return <div><CalendarHead/>
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
            {[0, 1, 2, 3, 4].map(i =>
                <tr>
                    {month[i].map(d => <td><Day {...d}/></td>)}
                </tr>
            )}

            </tbody>
        </table>
    </div>
}
