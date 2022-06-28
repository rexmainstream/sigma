import React from "react";
import { get_date, RolyartCalendar, show_events_today } from "../../components/calendar/rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert";
import { sort_events_alphabetically } from "../../res/scripts/search_and_sort_events";
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
                        </ul>
                        <ul id="completed_events">

                        </ul>
                    </div>
                    <div id="tooltip_container">

                    </div>
                </div>
            </div>
        </div>
    );
}


//Initialisation of calendar runs every time calendar component is mounted
export function initialise_calendar() {
    let calendarConfig = {
        container: 'calendar',
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    }

    //Creates calendar from library
    const calendar = new RolyartCalendar(calendarConfig);

    //checks if their are any events

    let db;
    const open_request = window.indexedDB.open('student_file', 14);
    //removes overdue events

    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })

    //If the users do not have the db
    open_request.addEventListener('upgradeneeded', (e) => {
        db = e.target.result;

        //Creates event list record
        const events_list = db.createObjectStore('events_list', {autoIncrement: false});
        events_list.createIndex("title", "title");
        events_list.createIndex("description", "description");
        events_list.createIndex("priority", "priority");
        events_list.createIndex("due_date", "due_date");
        events_list.createIndex("completed", "completed");

        //Creates current focus
        const current_focus = db.createObjectStore('current_focus', { autoIncrement: false} );
        current_focus.createIndex('user_focus', "user_focus", { unique: false });


        //Creates steps record
        const steps_list2 = db.createObjectStore('steps_list');
        steps_list2.createIndex('step_title', 'step_title', { unique: false });
        steps_list2.createIndex('step_desc', 'step_desc', { unique: false });
        steps_list2.createIndex('completed', 'completed', { unique: false });
        steps_list2.createIndex('order', 'order', { unique: true });

        
        show_events_today(get_date().today, false);
    })



    open_request.addEventListener('success', () => {
        // For testing purposes
        // test_driver_event_db(open_request.result);


        remove_overdue_events(open_request.result);
    })
}


// Removes the overdue events for the user
// Requires database as parameter
function remove_overdue_events( db ) {

    // Debug
    // console.log('remove_overdue_events is run!')

    // Gets todays key
    const today_key = parseInt(get_date().today.replaceAll('-', ""));
    
    // Overdue keys is and indexedDB keyrange
    const overdue_keys = IDBKeyRange.upperBound(today_key, true)

    // Gets the stored events
    const stored_events = db.transaction(['events_list'], "readwrite").objectStore( 'events_list' );

    // Incomplete events is an array
    const incomplete_events = [];

    stored_events.openCursor(overdue_keys).addEventListener('success', (e) => {
        const cursor = e.target.result;


        if ( cursor ) {

            // Gets todays events
            const today_events = cursor.value;


            // Finds incomplete events
            for (let i = 0; i < today_events.length; i++) {

                if ( today_events[i].completed === false ) {
                    // Sets it to today's date
                    today_events[i].due_date = get_date().today;


                    incomplete_events.push( today_events[i] );
                }

            }
            


            // Moves to next days events
            cursor.continue();
        } else {

            // Debug
            // console.log(incomplete_events);

            if (incomplete_events.length > 0) {
                custom_alert(
                    'Incomplete events',
                    "warning_yes_no",
                    `You have ${ incomplete_events.length } events that are incomplete. Add them to today?`,

                    // Adds incomplete events to today
                    () => {
                        const stored_events = db.transaction(['events_list'], "readwrite").objectStore( 'events_list' );
                        const get_today_events = stored_events.get( today_key );

                        get_today_events.addEventListener('success', () => {
                            let todays_events = get_today_events.result;


                            // Adds the incomplete events to the today events array
                            for ( let i = 0; i < incomplete_events.length; i++ ) {
                                
                                if ( todays_events === null || todays_events === undefined ) {

                                    // If no events today just sets todays events to the first index
                                    todays_events = [ incomplete_events[i] ];
                                } else {

                                    // Insertion sorts the array
                                    sort_events_alphabetically( todays_events, incomplete_events[i] );
                                }
                            }

                            // Deletes overdue events
                            stored_events.delete( overdue_keys )

                            // Puts new today's events plus new events to today
                            stored_events.put( todays_events, today_key );



                            // Closes database
                            db.close()


                            // Then shows the events today
                            show_events_today( get_date().today, false );
                        })




                    },

                    // Doesn't do anything
                    () => {
                        show_events_today( get_date().today, false );
                    }

                )
                    
            } else {
                
                // If no incomplete events just shows events today
                show_events_today( get_date().today, false )
            }


            // Finished reading events
            // console.log('finished reading events');
        }
    })

}

// Test driver for events database
function test_driver_event_db(db) {
    // Sets key to yesterday to test remove due events functionality
    const yesterday_key = parseInt(get_date().today.replaceAll("-", "")) - 1;
    let yesterday = get_date().today.split('-');
    const test_events = [];
    const stored_events = db.transaction(['events_list'], "readwrite").objectStore( 'events_list' );

    yesterday[2] = parseInt(yesterday[2]) - 1

    yesterday = `${yesterday[0]}-${yesterday[1]}-${yesterday[2].toString()}`;



    for (let i = 1; i <= 9; i++) {
        test_events.push(
            new Event_constructor(
                `Event ${i}`,
                'Hello World',
                'High',
                yesterday,
                false
            )
        )
    }


    stored_events.put(test_events, yesterday_key);

    
}

//Checks if the due_date of an event is overdue or not
//Returns TRUE if overdue
function check_overdue(date) {
    //Gets today date
    let today = new Date(get_date().today);

    //For debugging, set due date to a day before
    //today = new Date (`${get_date().year}-${get_date().month}-${parseInt(get_date().day)+3}`);

    //Gets difference between today and chosen date
    const time_diff = today - new Date(date);

    //Returns TRUE if overdue
    if (time_diff > 0) {
        return true;
    } else {
        return false;
    }
}

window.addEventListener('focus', (e) => {
    // //window.location.reload()
    // if (document.querySelectorAll('#events_container').length > 0) {
    //     return_events_list().length = 0
    //     got_database = false;
    //     initialise_calendar()
    //     window.scrollTo(0, 0);
    // }
})



