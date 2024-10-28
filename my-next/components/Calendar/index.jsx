import {classes} from './calendar.module.css'

export function DemoCalendarApp() {
    return <div>
        <h1>Календарь</h1>
        <Calendar date={new Date} />
    </div>
}

function Calendar({ date }) {
    const
        year = date.getFullYear(),
        month = date.getMonth(),
        max = (new Date(year, month + 1, 0)).getDate(),
        weekDay = (new Date(year, month, 1)).getDay(), // вс=0, пн=1, вт=2.....сб=6
        shift = (-1 + weekDay + 7) % 7;                 //  пн=0, вт=1,.....сб=5, вс=6
    return <table className={classes}>
        <caption>{month}-{year}</caption>
        <thead></thead>
        <Month shift={shift} max={max} />
    </table>
}

function Month({ shift, max }) {
    const
        arr = [];
    for (let start = 1 - shift; start <= max; start += 7) {
        arr.push(<Week key={start} start={start} max={max} />)
    }
    return <tbody>{arr}</tbody>;
}

function Week({ start, max }) {
    const
        arr = [];
    for (let day = start; day < start + 7; day++) 
        arr.push(<td key={day}>
            {day >= 1 && day <= max && day}
        </td>);
    
    return <tr>{arr}</tr>
}