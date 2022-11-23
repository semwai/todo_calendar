import styles from './Calendar.module.css';
import {useEffect, useState} from "react";


export function Calendar() {

    let [month, setMonth] = useState<number[][]>([
        [0, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 0, 0, 0, 0]])

    useEffect(() => {
        const now = new Date();
        const offset = new Date(now.getFullYear(), now.getMonth(), 0).getDay()
        console.log(month)
    }, [])

    return <div>CALENDAR
        <table>
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
                    {month[i].map(d => d>0?<td>{d}</td>:<td></td>)}
                </tr>
            )}

            </tbody>
        </table>
    </div>
}