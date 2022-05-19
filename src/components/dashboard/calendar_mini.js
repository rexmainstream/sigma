import React from "react";
import { get_date, return_events_list, RolyartCalendar, show_events_today } from "../../res/scripts/rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert";
import { sort_events_by_date } from "../../res/scripts/search_and_sort_events";
import { Event_constructor } from "../../res/scripts/add_event";

//got_database flag to stop getting database after already executed
let got_database = false;

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
                </div>
            </div>
        </div>
    );
}

//Checks if their are any events, if not then it gives instructions on how to add events
export function calendar_tutorial() {
    const events_list = document.querySelector('#events_list');
    const events_completed = document.querySelector('#completed_events');
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
    } else if (document.querySelectorAll('#calendar_tutorial').length !== 0   ) {
        //Removes the tutorial if there are no events
        events_list.classList.remove('center_vertical');
        events_list.removeChild(document.querySelector('#calendar_tutorial'));
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

    //Database
    let db;
    const open_request = window.indexedDB.open('student_file', 14);
    //Don't need to add database again when the component is mounted
    if (got_database === false) {
        let amount_overdue = 0
        open_request.addEventListener('success', () => {
        let overdue_events = [];
        //Gets the database variable
        db = open_request.result;
        const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');
        const events_list = return_events_list();
        let database_length;          
        const get_database_length = stored_events.count()              
        get_database_length.addEventListener('success', (e) => {
            //Gets database length
            database_length = e.target.result;

            //Less than 1second to process so no loading screen required
            /*for (let i = 1; i<=1000; i++) {
                stored_events.put(new Event_constructor("hey", "new event", "Low", get_date().today, false), i)
            }*/

            //Then reads and writes values to the db
            stored_events.openCursor().addEventListener('success', (e) => {
                const cursor = e.target.result;
                    //Iterates through the store database
                    //Max O(1000) processing 
                    if (cursor) {
                        //Adds the stored to the local array
                        if (check_overdue(cursor.value.due_date)) {
                            if (cursor.value.completed === true) {
                                //If the event is completed and overdue, it is deleted and the amount increments
                                stored_events.delete(cursor.key);
                                amount_overdue++;
                            } else {
                                //If the event is overdue but not completed, it is added to the overdue
                                //events array, and it is shifted down by the amount_overdue
                                stored_events.put(cursor.value, cursor.key - amount_overdue);
                                overdue_events.push(cursor.value);
                            }
                        } else {
                            //If the event is not overdue it is shifted down by the amount overdue
                            events_list.push(cursor.value);
                            stored_events.put(cursor.value, cursor.key - amount_overdue);
                        }

                        cursor.continue();
                    } else {
                        for (let i = 0; i < amount_overdue; i++) {
                            stored_events.delete(database_length - i)
                        }
                        if (overdue_events.length !== 0) {
                            //Alerts user on action
                            custom_alert('Overdue Events', "warning_yes_no", `You have ${overdue_events.length} overdue events that are not completed. Add them to today?`,
                            () => {
                                for (let i = overdue_events.length - 1; i >= 0; i--) {
                                    //Sets overdue events to today date
                                    overdue_events.due_date = get_date().today;

                                    //Adds overdue events to today
                                    events_list.unshift(overdue_events[i]);
                                }
                                sort_events_by_date();
                                got_database = true;
                                show_events_today();
                            }, () => {
                                //No function, when user presses "no"
                                //Deletes all overdue events
                                //Stored_events_2 new transaction
                                let amount_overdue2 = 0;
                                const stored_events_2 = db.transaction(['events_list'], 'readwrite').objectStore('events_list');
                                stored_events_2.openCursor().addEventListener('success', (e) => {
                                    const cursor2 = e.target.result;

                                    if (cursor2) {
                                        //Make it so it loops for every event
                                        //Max O(1000)
                                        if (check_overdue(cursor2.value.due_date)) {
                                            stored_events_2.delete(cursor2.key);
                                            amount_overdue2++
                                        } else {
                                            if (amount_overdue2 !== 0) {
                                                stored_events_2.put(cursor2.value, cursor2.key - amount_overdue2);
                                                stored_events_2.delete(cursor2.key);
                                            }
                                        }
                                        cursor2.continue()
                                    } else {
                                        sort_events_by_date();
                                        show_events_today();
                                        got_database = true;
                                    }
                                })
                            })
                        } else {
                            sort_events_by_date();
                            got_database = true;
                            show_events_today();
                        }          
                    }
                })
            })

            })        
    } else {
        show_events_today();
    }

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

//Checks if the due_date of an event is overdue or not
//Returns TRUE if overdue
function check_overdue(date) {
    let today = new Date (`${get_date().year}-${get_date().month}-${parseInt(get_date().day) + 1}`)

    const time_diff = today - new Date(date);

    if (time_diff > 0) {
        return true;
    } else {
        return false;
    }
}


