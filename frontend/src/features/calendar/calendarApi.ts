import {emptyDay, IDay} from "./calendarSlice";


function twoDimensional<T>(arr: T[], size: number): T[][] {
    let res = [];
    for (let i = 0; i < arr.length; i = i + size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}

export function fetchDays(year: number, month: number) {
    return new Promise<IDay[][]>(async (resolve, reject) => {
        const now = new Date();
        const days: IDay[] = []
        const offset = new Date(year, month, 0).getDay() // с какого дня недели начинаем счет
        const res = await fetch(`https://isdayoff.ru/api/getdata?year=${year}&month=${month + 1}`) // месяц тут с 1
        if (res.status !== 200) {
            reject(res.statusText)
        }
        const holidays = (await res.text()).split('').map(s => s === '1')
        for (let i = 0; i < offset; i++) days.push(emptyDay)
        for (let i = 0; i < holidays.length; i++) {
            const dayOffset = i + 1
            if (dayOffset === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
                days.push({num: dayOffset, holiday: holidays[i], today: true})
            } else
                days.push({num: dayOffset, holiday: holidays[i]})
        }
        console.log(days)
        resolve(twoDimensional(days, 7))
    })
}