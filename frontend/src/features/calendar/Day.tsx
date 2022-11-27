import {IDay, selectCalendar} from "./calendarSlice";
import styles from "./Calendar.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setDate} from "../tasks/tasksSlice";

export default function Day(p: IDay) {
    const calendar = useAppSelector(selectCalendar);
    const dispatch = useAppDispatch()

    if (p.num === 0) {
        return <></>
    }

    return <div onClick={() => dispatch(setDate({day: p.num, month: calendar.month, year: calendar.year})) }>
        <DaySwitch {...p}/>
    </div>
}

function DaySwitch({num, holiday, today}: IDay) {
    if (today) {
        return <div className={styles.today}>{num}</div>
    } else if (holiday) {
        return <div className={styles.holiday}>{num}</div>
    } else {
        return <div>{num}</div>
    }
}
