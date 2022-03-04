import React from "react";
import '../../res/styles/calendar_mini_styles.css'
import { RolyartCalendar } from "../../res/scripts/rolyart-calendar";
import Events_list_item from "./event_list_item";



export default function Calendar_mini() {
    return (
        <div className="box calendar">
            <div className="flex">
                <div id="calendar"></div>
            </div>
            <div className="center_vertical">
                <div id="mini_events">
                    <ul id="events_list">
                        <Events_list_item />
                        <Events_list_item />
                        <Events_list_item />
                        <Events_list_item />
                        <Events_list_item />
                        <Events_list_item />
                    </ul>
                    <div className="center_vertical">
                        <button className="clickable_button">View all events</button>
                    </div>
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
    

    //Testing overflow effect
    document.querySelector('#events_list').querySelector('a').textContent = `Overflow Test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`;
})

