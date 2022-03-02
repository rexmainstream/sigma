import React from "react";
import '../../res/styles/calendar_mini_styles.css'
import { RolyartCalendar } from "../../res/scripts/rolyart-calendar";



export default function Calendar_mini() {
    return (
        <div className="box calendar">
            <div className="flex">
                <div id="calendar"></div>
            </div>
            <div className="center_vertical">
                <div id="mini_events">
                    <h2>Events Today</h2>
                    <ul id="events_list">
                        <li><a href="">Event 1</a></li>
                        <li><a href="">Event 2</a></li>
                        <li><a href="">Event 3</a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                    </ul>
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

