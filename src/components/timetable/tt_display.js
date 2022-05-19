// Sub modules
import TT_COUNTDOWN_DISPLAY from './tt_countdown'
import TT_WEEKLY from './tt_weekly'
import TT_DAILY from './tt_daily'

// API data (formatted)
import { daily_formatted, weekly_formatted } from "./tt_data"

export default function tt_display(props) {
    return (
            <div className='timetable'>
                <TT_COUNTDOWN_DISPLAY raw={daily_formatted} />
                <TT_DAILY raw={daily_formatted} />
            </div>
    )
}


/*
className documentation

Timetable countdown
"timetable_countdown" (no key) ------> holds all of countdown
"countdown_title" (no key) ------> Maths Extension 2
"countdown_subtitle" (no key) -----> Ends in 5mins

Timetable_daily
"timetable_today" (no key) --------> holds all of today's timetable
"period_break" (key value: R) -------> Period 2 (free period) or Recess
"period_class" (key value: 1) -----> Maths Extension 2 with Miller

Timetable_weekly
"timetable_cycle" (no key) --------> holds all of the cycle's timetable
"week"(key value: A) -------> key: A B C, holds the week's data
"day" (key value: MonA) --------> key: Mon, Tue etc, holds the day's data
"period_day" (name-MonA) ------> Displays day name i.e Mon
"period_empty" (key value: MonA 0-12) -------> Displays roll call or free period i.e Period 2 or Recess
"period_class" (key value: MonA 1-12 (where the 12 means its the 12th day of the cycle)) --------> Displays class title (short name) i.e MAA A2

period_empty and period_class contains
"period_number" i.e 1,2,3,4,5
"period_description" i.e MAX A6 
*/