import Timetable_mini, { initialise_timetable } from './dashboard/timetable_mini';
import React from 'react';
import Calendar_mini, { calendar_tutorial, initialise_calendar } from './dashboard/calendar_mini';
import Focus, { initialise_focus } from './focus/focus';
import {Helmet} from 'react-helmet';
{/*Remember to add a full timetable!*/}

{/*This is the dashboard. Includes a timetable, calendar motivational quote display and a focus display*/}
export default class Dashboard extends React.Component {
  componentDidMount() {
    initialise_timetable();
    initialise_calendar();
  }
  
  render() {
    return (
      <div className='grid_wrapper'>
        <Timetable_mini />
        <Calendar_mini />
      </div>
    );
  }

}
