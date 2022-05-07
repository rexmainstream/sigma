import Timetable_mini from './dashboard/timetable_mini';
import Calendar_mini from './dashboard/calendar_mini';
import Motivational_quote from './dashboard/motivational_quote';
import Focus from './focus/focus';
import {Helmet} from 'react-helmet';
{/*Remember to add a full timetable!*/}

{/*This is the dashboard. Includes a timetable, calendar motivational quote display and a focus display*/}
export default function Dashboard() {
    return (
        <div className='grid_wrapper'>
          <Timetable_mini />
          <Calendar_mini />
          <Motivational_quote />
          <Focus />
        </div>
    );
}
