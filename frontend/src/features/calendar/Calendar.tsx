import styles from './Calendar.module.css';
import CalendarHead from "./CalendarHead";
import { IDay, selectCalendar} from "./calendarSlice";
import {useAppSelector} from "../../app/hooks";

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
    const calendar = useAppSelector(selectCalendar);
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
            {calendar.table !== null?
                [0, 1, 2, 3, 4].map(i => <tr key={i}>
                    {calendar.table![i].map(d => <td key={d.num}><Day {...d}/></td>)}
                </tr>):<p>load</p>}

            </tbody>
        </table>
    </div>
}
