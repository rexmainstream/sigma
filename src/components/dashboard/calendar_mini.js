import React from "react";
import '../../res/styles/calendar_mini_styles.css'
import { RolyartCalendar } from "../../res/scripts/rolyart-calendar";



export default function Calendar_mini() {
    return (
        <div className="box calendar">
            <div className="flex">
                <div id="calendar"></div>
            </div>
            <div className="flex">
                <div id="mini_events">
                    This is a static box. THis is where an event list will be placed
                </div>
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", function (){
    let calendarConfig = {
        container: 'calendar',
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    }
    const calendar = new RolyartCalendar(calendarConfig);
})

