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
                            <Events_list_item event_title='Hello'/>
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

//Checks if their are any events, if not then it gives instructions
export function calendar_tutorial() {
    const parent = document.querySelector('#events_container');
    const tutorial = document.createElement('div');

    //If the calendar doesn't have events it shows instructions
    if (parent.hasChildNodes() === false) {
        parent.className = `center_vertical`;
        tutorial.id = `calendar_tutorial`;
        tutorial.textContent = `Double click a calendar date to add an event.`;
        tutorial.style.animation = `fade_in_text 0.5s ease-out both`
        
        parent.append(tutorial);
        //console.log('no child nodes')
    }else {
        parent.removeChild(parent.querySelector('#calendar_tutorial'));
        parent.className = ``;
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
    calendar_tutorial()

}



