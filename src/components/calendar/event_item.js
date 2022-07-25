// Alex

// Imports
import React from "react";
import ReactDOM  from "react-dom";
import { custom_alert } from "../../res/scripts/add_alert";
import { Event_constructor, Event_form } from "../../res/scripts/add_event";
import { exit_modal } from "../../res/scripts/add_modal";
import add_inline_animation from "../../res/scripts/animation_timing";
import { get_date, show_events_today, user_selected_date } from "./rolyart-calendar";
import { sort_events_alphabetically } from "../../res/scripts/search_and_sort_events";
import Event_tooltip, { return_currently_hovering_over } from "./event_tooltip";
import { CtxMenu } from "../../res/scripts/ctxmenu";
import { check_mobile } from "../../res/scripts/check_mobile";
import { string_validation } from "../../res/scripts/data_validation";




// An event item
export default function Event_item( props ) {
    const title = props.title;
    const priority = props.priority;
    const description = props.desc;
    const completed = props.completed;
    const order = props.order;
    const due_date = props.due_date;
    let edit_title = "";
    let time_out;

    // Key is date without -
    const key = parseInt(due_date.replaceAll('-', ''));




    // Variables depending on the completion of the event
    let complete_btn_title = "Redo Event"
    let event_class = `event_item ${ priority }_priority added_event`

    if ( completed === false ) {
        complete_btn_title = "Complete Event"
        edit_title = "Edit event";
    }

    // when user completes/redos the event
    // requires the html location of event to be completed/redid as parameter
    function complete_redo_event(html_event) {
        // Opens database to find events on the day
        const open_request = window.indexedDB.open('student_file', 15);

        // If error or blocked
        open_request.addEventListener( 'error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        })

        open_request.addEventListener( 'blocked', () => {
            custom_alert( 'Please close other tabs of this site open', 'warning', "Failed to load database", false );
        })

        open_request.addEventListener( 'success', () => {
            const db = open_request.result;
            const stored_events = db.transaction( [ 'events_list' ], "readwrite" ).objectStore( 'events_list' );

            // Gets the events of the day
            const get_current_events = stored_events.get( key );

            get_current_events.addEventListener('success', () => {
                // Sets the event's complete status to opposite
                const events_on_day = get_current_events.result;

                events_on_day[ order ].completed = !completed;

                // Puts array of events onto the day
                stored_events.put( events_on_day, key );

                // html_event.classList.add( 'complete_event' );

                // html_event.addEventListener( 'animationend', function handler() {
                //     html_event.classList.remove( 'complete_event' );
                //     show_events_today( get_date().today, 'none' );
                //     html_event.removeEventListener( 'animationend', handler );
                // })


                add_inline_animation(html_event, 'complete_event 0.5s ease-in both', () => {

                    
                    // Shows the events today
                    show_events_today( user_selected_date(), true );
                    db.close();
                })            
            })
        })
    }

    // Shows a tooltip when user hovers over an event for more than 1 second
    function show_tooltip() {
        // Sets a timer that checks if the user 
        // has hovered over event item for more than 1 seconds
        time_out = setTimeout(function() {
            // Clears the time out since the time has already reached 
            clearTimeout(time_out);
            
            // Gets the root
            const root = document.getElementById('tooltip_container');

            // Renders the root
            ReactDOM.render(
                <Event_tooltip 
                    title = { title }
                    desc = { description }
                    priority = { priority }
                    due_date = { due_date }
                    completed = { completed }
                    visible = { true }
                />, root)

            // Debug
            // console.log('tooltip is shown');

        }, 1000)
    }


    // If user does not hover for 1 second or moves the cursor away
    function tooltip_time_out() {
        let time_out_tooltip;

        clearTimeout(time_out);

        time_out_tooltip = setTimeout(function() {
            if (return_currently_hovering_over() === false) {
            
                // Clears the time out
                clearTimeout(time_out_tooltip);
    
                const root = document.getElementById('tooltip_container');
                const tooltip = root.querySelector('.event_tooltip');
                
                // If a tooltip exists plays hide animation
                if (tooltip !== null) {
                    add_inline_animation(tooltip, 'show_tooltip 0.2s ease-out both reverse', () => {
                        ReactDOM.unmountComponentAtNode(root);
    
    
                        // Debug
                        // console.log('Tooltip is removed');
            
                    })
                }
            }    
        }, 1000)      

        

    }

    // This function runs when user attempts to edit an event.
    // Somehow doesn't play animation properly
    function edit_event( new_title, new_desc, new_due_date, new_priority) {
        const open_request = window.indexedDB.open('student_file', 15);


        // If error or blocked
        open_request.addEventListener( 'error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        })

        open_request.addEventListener( 'blocked', () => {
            custom_alert( 'Please close other tabs of this site open', 'warning', "Failed to load database", false );
        })


        
        open_request.addEventListener('success', () => {
            const db = open_request.result;
            const stored_events = db.transaction( [ 'events_list' ], "readwrite" ).objectStore( 'events_list' );

            // Object created from event
            const new_event = new Event_constructor(new_title, new_desc, new_priority, new_due_date, false);

            // New key for event
            const new_key = parseInt(new_due_date.replaceAll("-", ""));
            let different_keys = false

            
 
            // For Debug
            // console.log(new_event);

            // Debug
            // console.log('Changed day!');
            // console.log(`old key is ${key}`);
            // console.log(`new key is ${new_key}`);

            // Opens the events stored in old key to remove event

            // Checks if keys are same
            if ( new_key !== key ) {
                different_keys = true
            }

            const get_old_events = stored_events.get(key);

            // When transaction succeeds
            get_old_events.addEventListener('success', () => {
                // Gets old events and removes the old event
                const old_events = get_old_events.result;

                // console.log(key)
                // Removes the old event from the list
                old_events.splice(order, 1);

                // Insertion sorts events if the event does not change date
                // If changes date then no need to add on same day
                if ( different_keys === false ) {
                    sort_events_alphabetically(old_events, new_event);
                }

                if (old_events.length !== 0) {
                    // Writes the old events to the key in db
                    stored_events.put(old_events, key);
                } else {
                    stored_events.delete(key);
                }

                if ( different_keys === false ) {
                    show_events_today( user_selected_date(), false )
                }

                if ( different_keys === true ) {
                    // Gets the events of the day
                    const get_current_events = stored_events.get( new_key );
    
                    // When the transaction succeeds
                    get_current_events.addEventListener('success', () => {
                        let events_on_day = get_current_events.result;
    
                        if ( events_on_day === undefined ) {
    
                            // If no events on day just creates new array
                            events_on_day = [ new_event ];
                            stored_events.put(events_on_day, new_key);
                            
    
                        } else {
    
                            // Insertion sort adds event if there are currently events
                            sort_events_alphabetically( events_on_day, new_event );
    
                            stored_events.put( events_on_day, new_key );

                        }

                        // Shows events today
                        show_events_today( user_selected_date(), false );
                    })
                }
            })



        }) 
    }


    // This function runs when user deletes an event.
    function delete_event() {
        const open_request = window.indexedDB.open('student_file', 15);

        // For Debug
        // console.log(new_event);

        // If error or blocked
        open_request.addEventListener( 'error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        })

        open_request.addEventListener( 'blocked', () => {
            custom_alert( 'Please close other tabs of this site open', 'warning', "Failed to load database", false );
        })

        open_request.addEventListener('success', () => {
            const db = open_request.result;
            const stored_events = db.transaction( [ 'events_list' ], "readwrite" ).objectStore( 'events_list' );

            const get_events = stored_events.get(key);

            get_events.addEventListener('success', () => {
                const current_events = get_events.result;

                // Debug
                // console.log(current_events);
                // console.log(current_events[order]);

                // Removes the deleted event
                current_events.splice(order, 1);

                // Debug
                // console.log(current_events);


                // Then writes the current events to database
                stored_events.put(current_events, key);

                // Shows events on the selected date
                show_events_today( user_selected_date(), false );
            })



        })      
 




    }
    
    return (
        <li
            aria-label = "list item for events"
            className = { event_class }
            onMouseEnter = {
                (e) => {
                    show_tooltip();
                }
            }

            onMouseLeave = {
                (e) => {
                    tooltip_time_out()
                }
            }
            onAnimationEnd = { ( e ) => {
                // Removes classlist and animation when animation ends
                e.target.classList.remove( 'added_event' );
                e.target.style = "";
            }}>
            <div 
                title = { complete_btn_title } 
                className = "root_checkmark"
                onMouseOver = {
                    ( e ) => {
                        const html_event = e.currentTarget.parentNode;

                            const checkmark = e.currentTarget.querySelector( '.checkmark' );

                            // Adds the checkmark
                            checkmark.classList.add( 'show_checkmark' );
                    }
                }

                onMouseOut = {
                    ( e ) => {
                        const html_event = e.currentTarget.parentNode;
                        if ( html_event.classList.contains( 'complete_event' ) === false ) {

                            const checkmark = e.currentTarget.querySelector( '.checkmark' );

                            // Removes the checkmarks
                            checkmark.classList.remove( 'show_checkmark' );
                        }
                    }
                }

                onClick = {
                    ( e ) => {
                        complete_redo_event( e.currentTarget.parentNode );
                    }
                }
            >
                <div className="checkmark"></div>
            </div>
            <a title = {edit_title} 
                className="event_item"
                onClick={( e ) => {
                    if (completed === false) {
                        const event_item_html = e.currentTarget.parentNode;
                        // Opens a form
                        Event_form( user_selected_date(), get_date().today, get_date().max_date );
                        const form = document.querySelector( '#form' )
                        const button = form.querySelector( '.clickable_button' );
                        const title_input = form.querySelector( 'input.event_title' );
                        const description_input = form.querySelector( 'textarea' );
                        const due_date_input = form.querySelector("input.event_due_date");
                        const delete_button = document.createElement('button');

                        // creates a new button with new event listeners
                        const new_button = button.cloneNode();
                        const button_container = button.parentNode;

                        // Initialising html values for the new button
                        new_button.innerHTML = "Edit event";
                        new_button.title = "Edit the event";
                        new_button.ariaLabel = "Edit event button";

                        // Add previous values
                        title_input.value = title;
                        description_input.value = description;
                        delete_button.innerHTML = "Delete";
                        delete_button.title = "Delete Event";
                        delete_button.classList.add('clickable_button', 'delete_button');
                        form.querySelector( `input[title='${priority}']` ).checked = true;


                        // Removes old button with wrong event handlers
                        button_container.removeChild( button );

                        // Appends new button
                        button_container.parentNode.append( new_button );
                        button_container.parentNode.append( delete_button );

                        // Adds correct handlers
                        new_button.addEventListener('click', (evt) => {
                            // Gets the priority
                            const priority_new = document.querySelector('input[name="priority"]:checked').title;
                            if (string_validation(title_input.value, 2, 50, 'title')) {
                                // Exits modal
                                exit_modal( evt );
                                
                                // Then adds new event to db
                                edit_event( title_input.value, description_input.value, due_date_input.value, priority_new );
                            }
                        })

                        delete_button.addEventListener('click', (e) => {
                            // Deletes the event
                            delete_event();

                            // Exits the modal
                            exit_modal(e)
                        })

                    }
                }}
            >
                { title }
            </a>
        </li>
    )
}


