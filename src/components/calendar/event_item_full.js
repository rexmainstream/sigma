import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { convert_date_to_str, get_date } from './rolyart-calendar';
import reactStringReplace from 'react-string-replace';
import add_inline_animation from '../../res/scripts/animation_timing';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { Event_constructor, Event_form } from '../../res/scripts/add_event';
import { date_to_key } from './date_to_key';
import { custom_alert } from '../../res/scripts/add_alert';
import { sort_events_alphabetically } from '../../res/scripts/search_and_sort_events';
import { show_events } from './calendar_full';
import { check_desktop } from '../../res/scripts/check_mobile';

export default function Event_item_full(props) {
    
    // Properties of component
    let days_left = props.days_left;
    let description = props.description;
    let title = props.title;
    let title_string = title;
    let description_string = description;
    const priority = props.priority;
    const due_date = props.due_date;
    const search = props.search;
    const completed = props.completed;
    const order = props.order;


    let class_name = 'event_item_full';
    let animation_complete = true;

    // Classlist for show description
    let show_description_class = ["event_description hide_description", "Show Description"];


    // Complete button if incomplete
    let redo_complete_button = 
    <button className='icon_button'>
        <FontAwesomeIcon 
            title = 'Complete Event'
            aria-label = 'complete event button'
            icon = { faCheck }
            onClick = { () => {complete_redo_event()} }    
        />
    </button>


    // debug
    // console.log(search);

    if (completed === true) {
        class_name += ' event_completed';


        // Redo button if completed
        redo_complete_button = 
        <button className = 'icon_button'>
            <FontAwesomeIcon 
                title = 'Redo Event'
                aria-label = 'redo event button'
                icon = { faRedo }
                onClick = { () => {complete_redo_event()} }    
            />
        </button>
    }

    if (search !== false) {
        // Search is case insensitive, regular expression required
        const search_case_insens = new RegExp(`(${search})`, "gi");

        // finds the search word in the title then adds a highlight class
        // to it
        title = reactStringReplace(title, search_case_insens, (match, i) => (
            <span
                className = 'search_word'
                key = { i } 
            >
                { match }
            </span>
        ));

        description = reactStringReplace(description, search_case_insens, (match, i) => (
            <span
                className = 'search_word'
                key = { i } 
            >
                {match}
            </span>
        ))

        if (description.length > 1 && search !== "") {
            show_description_class[0] = "event_description show_description"
            show_description_class[1] = "Hide Description"
        }       

    }


    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Gets the date
    if (days_left !== "") {
        switch (days_left) {
            case get_date().today:
                days_left = 'Today';
                break;
            case convert_date_to_str(tomorrow).date:
                days_left = 'Tomorrow';
                break;
            default:
                days_left = `${ days_left }`;
                break;
        }
    
        // If date format then changes the days left into an integer
        if (isNaN(new Date(days_left)) === false) {
            const today = new Date();
            const due_date = new Date(days_left)
            const difference = due_date.getTime() - today.getTime();
            days_left = `In ${Math.ceil(difference / (1000 * 3600 * 24))} days`;            
        }
    }

    // Edit event 
    function edit_event(new_title, new_desc, new_priority, new_due_date) {
        const open_request = window.indexedDB.open('student_file', 15);

        // Error messages
        open_request.addEventListener('blocked', () => {
            custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
        })
        

        open_request.addEventListener('error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        })


        open_request.addEventListener('success', () => {
            const db = open_request.result;
            const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');
            const key = date_to_key(due_date);
            const new_key = date_to_key(new_due_date);

            // Object created from event
            const new_event = new Event_constructor(new_title, new_desc, new_priority, new_due_date, false);
            let different_keys = false

            // Checks if keys are same
            if ( new_key !== key ) {
                different_keys = true

                // Debug
                // console.log('keys have changed');
            }

            // Debug
            // console.log('key is', key);
            // console.log('new key is', new_key);
            // console.log(new_event);



            const get_old_events = stored_events.get(key);

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
                    // Shows events today
                    // show_events_today( user_selected_date(), false )
                    show_events(undefined, undefined, undefined, search, undefined, undefined, undefined);
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
                        // show_events_today( user_selected_date(), false );
                        show_events(undefined, undefined, undefined, search, undefined, undefined, undefined);
                    })
                }
            })


        })
    }

    // Delete event
    function delete_event() {
        const open_request = window.indexedDB.open('student_file', 15);

        // Error messages
        open_request.addEventListener('blocked', () => {
            custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
        })
        

        open_request.addEventListener('error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        })


        open_request.addEventListener('success', () => {
            const db = open_request.result;
            const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');
            const key = date_to_key(due_date)
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
                show_events(undefined, undefined, undefined, search, undefined, undefined, undefined);
            })

        })

    }

    // Complete event
    function complete_redo_event() {
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
            const key = date_to_key(due_date)
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

                show_events(undefined, undefined, undefined, search, undefined, undefined, undefined);
            })
        })
    }

    // Shows the description
    function show_description(e) {
        // console.log(e.currentTarget.parentNode.parentNode.parentNode);

        const description = e.currentTarget.parentNode.parentNode.parentNode.querySelector('.event_description');
        if (description.classList.contains('hide_description')) {
            description.classList.replace("hide_description", "show_description");
            e.currentTarget.parentNode.setAttribute('title', 'Hide Description');
        } else {
            description.classList.replace("show_description", "hide_description");
            e.currentTarget.parentNode.setAttribute('title', 'Show Description');
        }
    }

    // Hides the group
    function show_hide_group(e) {
        const event_group = e.currentTarget.parentNode.parentNode.parentNode;
        event_group.style.maxHeight = `${event_group.scrollHeight}px`;

        if (event_group.classList.contains('hide_event_group') === false) {

            animation_complete = false;
            event_group.classList.add('hide_event_group');
            add_inline_animation(event_group, "collapse 1.3s ease-out 0.4s", "", "", "", "", () => {
                // console.log('hello')
                animation_complete = true;
                event_group.style.maxHeight = null;
                // event_group.classList.add('hide_event_group');
            });
        } else {
            // event_group.style.maxHeight = null;
            animation_complete = false;
            event_group.classList.add('show_event_group')
            event_group.classList.remove('hide_event_group');
            event_group.addEventListener('transitionend', function handler() {
                event_group.style.maxHeight = null;
                animation_complete = true;
                event_group.classList.remove('show_event_group');
                event_group.removeEventListener('transitionend', handler)
            })
        }

    }


    if (check_desktop()) {
        return (
            <div className='event_item_container'>
                <div className='timeline'>
                    <div 
                        className = 'days_left'
                        title = 'Hide Group'
                        // onMouseOver = {
                        //     (e) => {
                        //     }
                        // }
    
                        // onMouseLeave = {
                        //     (e) => {
                        //     }
                        // }
    
                        onClick = {
                            (e) => {
                                if (animation_complete === true) {
                                    show_hide_group(e);
                                }
                            }
                        }
                    >
                        <span>
                            {`${days_left}`}
                        </span>                
                    </div>
    
                    <div 
                        className='vl'
                        // onMouseEnter = {
                        //     (e) => {
                        //         // highlight_group(e);
                        //     }
                        // }
    
                        // onMouseLeave = {
                        //     (e) => {
                        //         // highlight_group_time_out(e);
                        //     }
                        // }
    
                        onClick = {
                            (e) => {
                                if (animation_complete === true) {
                                    show_hide_group(e);
                                }
                            }
                        }
                    >
    
                    </div>
                </div>
                <div 
                    className= { class_name }
                    aria-label='full event item'
                >
                    <h2 className='event_title'>
                        { title }
                    </h2>
                    <hr></hr>
                    <div className = 'flex'>
                        <div className = 'event_properties'>
                            <div>
                                <span className='event_property'>Priority:</span>
                                <span>{  priority  }</span>
                            </div>
                            <div>
                                <span className='event_property'>Due Date:</span>
                                <span>{ due_date }</span>
                            </div>
                        </div>
                        <div className='button_container' id='no_print'>
                            <button 
                                className='icon_button'
                                aria-label = 'edit event button'
                                title = 'Edit Event'
                                onClick={
                                    () => {
                                        // Opens event form, when button is clicked, edits the event
                                        Event_form(due_date, get_date().today, get_date().max_date, 
    
                                        function(new_title, new_desc, new_priority, new_due_date) {
                                            edit_event(new_title, new_desc, new_priority, new_due_date);
                                        },
                                        
                                        [title_string, description_string, due_date, priority]
                                        )
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = { faEdit } />
                            </button>
                            <button 
                                className='icon_button'
                                aria-label = 'remove event button'
                                title = 'Remove Event'
                                onClick = {
                                    () => {
                                        custom_alert('Delete Event?', 'warning_yes_no', 'Are you sure you want to delete this event? This action cannot be undone', () => {
                                            delete_event()
                                        }, () => {

                                        })
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = { faTimes } />
                            </button>
                            { redo_complete_button }
                        </div>
                    </div>
                    <hr></hr>
                    <div className = {show_description_class[0]}>
                        { description }
                    </div>
                    <div className ="button_container" id='no_print'>
                        <button 
                            title = {show_description_class[1]} 
                            className = "description_button"
                        >
                            <FontAwesomeIcon 
                                icon = { faChevronDown }
                                onClick = { (e) => {
                                    // Debug
                                    // console.log('Clicked!')
    
                                    show_description(e)
                                }} 
                            />
                        </button>
                    </div>
                </div>
            </div>
    
        )
    } else {
        return (
            <div className='event_item_container'>
                <div className='timeline'>
                    <div 
                        className = 'days_left'
                        title = 'Hide Group'
                        // onMouseOver = {
                        //     (e) => {
                        //     }
                        // }
    
                        // onMouseLeave = {
                        //     (e) => {
                        //     }
                        // }
    
                        // onClick = {
                        //     (e) => {
                        //         if (animation_complete === true) {
                        //             show_hide_group(e);
                        //         }
                        //     }
                        // }
                    >
                        <span>
                            {`${days_left}`}
                        </span>                
                    </div>
    
                    <div 
                        className='vl'
                        // onMouseEnter = {
                        //     (e) => {
                        //         // highlight_group(e);
                        //     }
                        // }
    
                        // onMouseLeave = {
                        //     (e) => {
                        //         // highlight_group_time_out(e);
                        //     }
                        // }
    
                        onClick = {
                            (e) => {
                                if (animation_complete === true) {
                                    show_hide_group(e);
                                }
                            }
                        }
                    >
    
                    </div>
                </div>
                <div 
                    className= { class_name }
                    aria-label='full event item'
                >
                    <div className='flex'>
                        <h2 className='event_title'>
                            { title }
                        </h2>
                        <div className='button_container' id='no_print'>
                            <button 
                                className='icon_button'
                                aria-label = 'edit event button'
                                title = 'Edit Event'
                                onClick={
                                    () => {
                                        // Opens event form, when button is clicked, edits the event
                                        Event_form(due_date, get_date().today, get_date().max_date, 
    
                                        function(new_title, new_desc, new_priority, new_due_date) {
                                            edit_event(new_title, new_desc, new_priority, new_due_date);
                                        },
    
                                        [title, description, due_date, priority]
                                        )
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = { faEdit } />
                            </button>
                            <button 
                                className='icon_button'
                                aria-label = 'remove event button'
                                title = 'Remove Event'
                                onClick = {
                                    () => {
                                        custom_alert('Delete Event?', 'warning_yes_no', 'Are you sure you want to delete this event? This action cannot be undone', () => {
                                            delete_event()
                                        }, () => {

                                        })
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = { faTimes } />
                            </button>
                            { redo_complete_button }
                        </div>
                    </div>
                    <hr></hr>
                    <div className = {show_description_class[0]}>
                    <div className = 'flex'>

                        <div className = 'event_properties'>
                            <div>
                                <span className='event_property'>Due:</span>
                                <span>{ due_date }</span>
                            </div>
                            <div>
                                <span className='event_property'>Priority:</span>
                                <span>{ priority }</span>
                            </div>
                        </div>
                    </div>
                    <hr></hr>

                        { description }
                    </div>
                    <div className ="button_container" id='no_print'>
                        <button 
                            title = {show_description_class[1]} 
                            className = "description_button"
                        >
                            <FontAwesomeIcon 
                                icon = { faChevronDown }
                                onClick = { (e) => {
                                    // Debug
                                    // console.log('Clicked!')
    
                                    show_description(e)
                                }} 
                            />
                        </button>
                    </div>
                </div>
            </div>
    
        )
    }
}