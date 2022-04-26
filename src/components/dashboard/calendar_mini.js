import React from "react";
import ReactDom from "react-dom";
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
                    <hr></hr>
                    <div id="events_container">
                        <ul id="events_list">
                            {/**/}
                        </ul>
                        <ul id="completed_events">

                        </ul>
                    </div>

                    {/*<div className="center_vertical">
                        <button className="clickable_button">View all events</button>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}

//Checks if their are any events, if not then it gives instructions on how to add events
export function calendar_tutorial() {
    const events_list = document.querySelector('#events_list');
    const events_completed = document.querySelector('#completed_events')
    const tutorial = document.createElement('div');

    //If the calendar doesn't have events it shows instructions
    if (events_list.hasChildNodes() === false && events_completed.hasChildNodes() === false) {
        events_list.classList.add('center_vertical');
        tutorial.id = `calendar_tutorial`;
        tutorial.textContent = `There are no events on this day. Click and hold on a calendar date to add an event.`;
        tutorial.style.animation = `fade_in_text 0.5s ease-out both`
        tutorial.style.paddingTop = `4rem`;
        
        events_list.append(tutorial);
        //console.log('no child nodes')
    }else if (document.querySelectorAll('#calendar_tutorial').length !== 0   ) {
        events_list.classList.remove('center_vertical');
        events_list.removeChild(document.querySelector('#calendar_tutorial'));
        //console.log('has child nodes')
    }
}


export function initialise_calendar() {
    let calendarConfig = {
        container: 'calendar',
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    }
    const calendar = new RolyartCalendar(calendarConfig);

    //checks if their are any events
    calendar_tutorial();

}



