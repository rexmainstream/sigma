import React from 'react';
//Import Calendar Modules
import Calendar_mini,{ initialise_calendar } from './dashboard/calendar_mini';
import TT_display from "./timetable/tt_display"


export default class Dashboard extends React.Component {
  componentDidMount() {
    //initialises calendar and timetable
    initialise_calendar();
  }
  
  render() {
    return (
      <div className='grid_wrapper'>
        <TT_display />
        <Calendar_mini />
      </div>
    );
  }

}
