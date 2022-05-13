import React from "react";
import { return_events_list, RolyartCalendar, show_events_today } from "../../res/scripts/rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert";
import { Event_constructor } from "../../res/scripts/add_event";


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

    let db;
    const open_request = window.indexedDB.open('student_file', 14);

    open_request.addEventListener('success', () => {
        db = open_request.result;
        const stored_events = db.transaction(['events_list']).objectStore('events_list');
        const events_list = return_events_list()
        stored_events.openCursor().addEventListener('success', (e) => {
            const cursor = e.target.result;
            if (cursor) {
                events_list.push(cursor.value)
            } else {
                show_events_today();
            }

            cursor.continue()
        })
    })

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })

    open_request.addEventListener('upgradeneeded', (e) => {
        db = e.target.result;
        const events_list = db.createObjectStore('events_list', {autoIncrement: false});
        events_list.createIndex("title", "title");
        events_list.createIndex("description", "description");
        events_list.createIndex("priority", "priority");
        events_list.createIndex("due_date", "due_date");
        events_list.createIndex("completed", "completed");

        const current_focus = db.createObjectStore('current_focus', { autoIncrement: false} );
        current_focus.createIndex('user_focus', "user_focus", { unique: false })

        //db.deleteObjectStore('steps_list')
        const steps_list2 = db.createObjectStore('steps_list');
        steps_list2.createIndex('step_title', 'step_title', { unique: false });
        steps_list2.createIndex('step_desc', 'step_desc', { unique: false });
        steps_list2.createIndex('completed', 'completed', { unique: false });
        steps_list2.createIndex('order', 'order', { unique: true });
    })
}



