import styles from './Calendar.module.css';
import CalendarHead from "./CalendarHead";
import {selectCalendar} from "./calendarSlice";
import {useAppSelector} from "../../app/hooks";
import {Spinner} from "../spinner/Spinner";
import Day from "./Day";

export function Calendar() {
    const calendar = useAppSelector(selectCalendar);

    if (calendar.table == null || calendar.status == 'loading') {
        return <Spinner/>
    }
    if (calendar.status == 'failed') {
        return <div>Error</div>
    }

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
            {[0, 1, 2, 3, 4].map(i => <tr key={i}>
                {calendar.table![i].map((d, j) => <td key={j}><Day {...d}/></td>)}
                </tr>)}
            </tbody>
        </table>
    </div>
}
