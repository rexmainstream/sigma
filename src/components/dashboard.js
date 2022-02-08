import Timetable_mini from './timetable_mini';
import Calendar_mini from './calendar_mini';
import Motivational_quote from './motivational_quote';
import Focus_mini from './focus_mini';
{/*Remember to add a full timetable!*/}

{/*This is the dashboard. Includes a timetable, calendar motivational quote display and a focus display*/}
export default function Dashboard() {
    return (
        <div className='grid_wrapper'>
          <Timetable_mini />
          <Calendar_mini />
          <Motivational_quote />
          <Focus_mini />
        </div>
    );
}