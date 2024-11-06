import { useContext, useMemo, useState } from 'react';
import classes from './calendar.module.css';
import { LocaleContext } from './LocaleCalendar';


export function DemoCalendarApp() {
    const
        [locale, setLocale] = useState('ru');

    return <div>
        <h1>Календарь</h1>
        <label>
            locale:
            <select value={locale} onChange={event => setLocale(event.target.value)}>
                {['ru', 'en', 'ar', 'zh', 'ko', 'ja']
                    .map(l => <option key={l} value={l}>{l}</option>)}
            </select>
        </label>
        <LocaleContext.Provider value={locale} >
            <Demo1 />
            <Demo2 />
            <Demo3 />
            <Demo4 />
        </LocaleContext.Provider>
    </div>
}

function Demo1() {
    const
        [value, setValue] = useState(DateToYYYYMM(new Date));
    return <fieldset>
        <input type='month' value={value} onChange={event => setValue(event.target.value)} />
        <Calendar date={YYYYMMToDate(value)} />
    </fieldset>
}

function Demo2() {
    return <LocaleContext.Provider value='ko'>
        <fieldset value="KOREA">
            <Calendar date={new Date} />
        </fieldset>
    </LocaleContext.Provider>
}

function Demo3() {
    return <fieldset>
        <input type='date' />
    </fieldset>
}

function Demo4() {
    const
        [date, setDate] = useState(new Date)
    // [value, setValue] = useState(50)
    return <fieldset>
        <legend>Select Date</legend>
        {/* <input type="range" value={value} onChange={event => setValue(event.target.value)} />{value} */}
        <div>
            {date.toLocaleDateString('ru',
                { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <SelectDate date={date} setDate={setDate} />
    </fieldset>
}

function SelectDate({ date, setDate }) {
    const
        year = date.getFullYear(),
        month = date.getMonth(),
        monthName = date.toLocaleDateString('ru', { month: 'long' }),
        day = date.getDate(),
        onClick = event => {
            const
                days = +event.target.closest('table.' + classes.calendar + 'tbody td')?.textContent;
            if (!days) return;
            setDate(new Date(year, month, days));
        };
    return <div>
        <div>
            <input
                onChange={event => setDate(new Date(+event.target.value, month, day))}
                type="number"
                value={year}
                style={{ width: '60px' }}
            />
            <button onClick={() => setDate(new Date(year, month - 1, day))}>←</button>
            {monthName}
            <button onClick={() => setDate(new Date(year, month + 1, day))}>→</button>
        </div>
        <div onClick={onClick}>
            <Calendar date={date} />
        </div>
    </div>
}

function DateToYYYYMM(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}

function YYYYMMToDate(str) {
    const [year, month] = str.split('-');
    return new Date(year, month - 1, 1);
}

function Calendar({ date }) {
    const
        locale = useContext(LocaleContext),
        dayNames = useMemo(() =>
            Array.from({ length: 7 }, (_, index) =>
                <td key={index}>
                    {(new Date(2019, 0, index))
                        .toLocaleDateString(locale, { weekday: 'short' })}
                </td>), [locale]),

        caption = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        max = (new Date(year, month + 1, 0)).getDate(),
        weekDay = (new Date(year, month, 1)).getDay(), // вс=0, пн=1, вт=2.....сб=6
        shift = (-1 + weekDay + 7) % 7,                //  пн=0, вт=1,.....сб=5, вс=6

        Month = () => {
            const
                arr = [];
            for (let start = 1 - shift; start <= max; start += 7) {
                arr.push(<Week key={start} start={start} />)
            }
            return <tbody>{arr}</tbody>;
        },
        Week = ({ start }) => {
            const
                arr = [];
            for (let d = start; d < start + 7; d++)
                arr.push(<td key={d} className={d == day && classes.selected}>
                    {d >= 1 && d <= max && d}
                </td>);

            return <tr>{arr}</tr>
        };

    return <table className={classes.calendar}>
        {/* <caption>{month}-{year}</caption> */}
        <caption>{caption}</caption>
        <thead><tr>{dayNames}</tr></thead>
        <Month shift={shift} max={max} />
    </table>
}

