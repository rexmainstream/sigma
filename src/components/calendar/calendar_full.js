// Imports
import React from "react";
import ReactDOM  from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faPlus, faFilePdf, faSearch, faTrash, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ReactDropdown from "react-dropdown";
import { convert_date_to_str, get_date } from "./rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert";
import { bubble_sort_events_alphabetically, bubble_sort_events_priority, sort_events_alphabetically } from "../../res/scripts/search_and_sort_events";
import Event_item_full from "./event_item_full";
import { check_desktop } from "../../res/scripts/check_mobile";
import { Event_constructor, Event_form } from "../../res/scripts/add_event";
import { date_to_key } from "./date_to_key";
import Print_event_item from "./print_event";
import { ordinal_suffix_of } from "../../res/scripts/suffix";





let current_time_range;
let current_sort_option;
let current_timeline_option;
let current_search;
let current_order;
let current_completed = 'Both';
// let timeoutID = 0
let time_out;
let calendar;



export default class Full_calendar extends React.Component {

    componentDidMount() {
        // Scrolls to top when user enters the page
        window.scrollTo(0, 0);
        initialise_full_calendar()
    }

    render() {

        const time_range_options = [
            {
                label: 'Today'
            },
            {
                label: 'Selected Month'
            },
            {
                label: 'All'
            }
        ]

        const order_options =  [
            { 
                label: 'Ascending'
            },
            {
                label: 'Descending'
            }
        ]
        const sort_options = [
            {
                label: 'Due Date'
            },
            {
                label: 'Priority'
            },
            {
                label: 'Alphabet'
            },
            {
                label: 'Date Set'
            }
        ]

        const completed_options = [
            {
                label: 'Both'
            },
            {
                label: 'Completed'
            },
            {
                label: 'Incomplete'
            }
        ]

        function search_query_enter(e) {
            // Debug
            // console.log(e.key);
            const current_input = e.target.value;

            if (e.key === 'Enter') {
                // console.log('show events');
                // Shows events if user presses enter
                current_search = current_input;
                show_events(
                    current_time_range, 
                    current_sort_option,
                    current_timeline_option,
                    current_search,
                    current_order,
                    'search value'
                )

                e.target.blur();
            }

        }

        // This function adds the new event and then shows the events
        function add_new_event_full(title, desc, priority, due_date) {
            // Debugging output statement
            // console.log(title, desc, priority, due_date);

            // Request to open database
            const open_request = window.indexedDB.open('student_file', 15);

            // Error messages
            open_request.addEventListener('blocked', () => {
                custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
            })
            

            open_request.addEventListener('error', () => {
                custom_alert("Failed to load database", 'error', "Failed to load database.", false);
            })

            open_request.addEventListener('success', () => {
                // Database equals to result
                const db = open_request.result;
                const event_key = date_to_key(due_date);
                const the_event = new Event_constructor(title, desc, priority, due_date, false)

                // Gets stored events
                const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');

                const get_events_today = stored_events.get(event_key);

                get_events_today.addEventListener('success', () => {
                    // Events today is the result
                    const events_today = get_events_today.result;
       
                    // If no current events just adds the event to the index
                    // If current events exist then adds sorted array
                    if (events_today !== undefined && events_today !== null) {
        
                        sort_events_alphabetically(events_today, the_event);
            
                        
                        // Then adds sorted array to the day
                        stored_events.put(events_today, event_key);
                    } else {
                        stored_events.put([the_event], event_key);
                    }

                    show_events(
                        current_time_range,
                        current_sort_option,
                        current_timeline_option,
                        current_search,
                        current_order,
                        'search value'
                    );
                })
            })
        }

        function toMonthName(monthNumber) {
            const date = new Date();
            date.setMonth(monthNumber - 1);
          
            // 👇️ using visitor's default locale
            return date.toLocaleString([], {
              month: 'long',
            });
          }
          

        // Print events routine
        function print_all_events() {
            const start_key = date_to_key(get_date().today);
            const end_key = date_to_key(get_date().max_date);

            const key_range = IDBKeyRange.bound(start_key, end_key);

            // Request to open database
            const open_request = window.indexedDB.open('student_file', 15);

            // Error messages
            open_request.addEventListener('blocked', () => {
                custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
            })
            

            open_request.addEventListener('error', () => {
                custom_alert("Failed to load database", 'error', "Failed to load database.", false);
            })
            
            open_request.addEventListener('success', () => {
                // Lets database equal result
                const db = open_request.result;
                const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');

                let current_month = get_date().month;
                const sorted_events_by_date = [];
                let current_month_events = []
                const get_all_events = stored_events.openCursor(key_range).addEventListener('success', (e) => {
                    const cursor = e.target.result;
                    
                    if (cursor) {
                        // Gets the days events and the events on the month
                        const days_events = cursor.value;
                        const event_month = get_date(new Date(days_events[0].due_date)).month

                        // If events month is the same as current month it pushes it to the array
                        if (event_month === current_month) {
                            bubble_sort_events_priority(days_events)
                            const current_day_events = [];
                            for (const an_event of days_events) {
                                if (an_event.completed === false) {
                                    current_day_events.push(an_event);
                                }
                            }
                            current_month_events.push(current_day_events)
                        } else {
                            // If current month events exceed zero, pushes it to the sorted events list
                            if (current_month_events.length > 0) {
                                sorted_events_by_date.push(
                                    {
                                        all_events_on_month: current_month_events,
                                        month: current_month
                                    }
                                )
                            }
                            current_month = event_month;
                            current_month_events = [];

                            bubble_sort_events_priority(days_events)
                            // Pushes events to next events arry in next month
                            const current_day_events = [];
                            for (const an_event of days_events) {
                                if (an_event.completed === false) {
                                    current_day_events.push(an_event);
                                }
                            }
                            current_month_events.push(current_day_events)
                        }
                        cursor.continue();
                    } else {
                        const print_output = [];


                        if (current_month_events.length > 0) {
                            // Array of records
                            sorted_events_by_date.push(
                                {
                                    all_events_on_month: current_month_events,
                                    month: current_month
                                }
                            )
                        }

                        // Frontend, pushes the events into components
                        let counter = 0;
                        for (const event_month of sorted_events_by_date) {
                            // Events are grouped
                            const event_group = [];


                            for (const events_on_day of event_month.all_events_on_month) {
                                // Debug
                                // console.log(an_event)
                                // console.log(events_on_day)

                                let current_day
                                const event_day = [];
                                for (const an_event of events_on_day) {
                                    current_day = an_event.due_date;                    
                                    event_day.push(
                                        <Print_event_item 
                                            event_title = { an_event.title }
                                            due_date = { an_event.due_date }
                                            priority = { an_event.priority }
                                            key = { counter }
                                        />
                                    )
                                    counter++
                                }
                                event_group.push(
                                    <div className="day_divider">{ordinal_suffix_of(parseInt(current_day.split('-')[2]))}</div>, event_day
                                )
                            }


                            // Debug
                            // console.log(event_group)
                            print_output.push(
                                <div className="print_event_group">
                                    <div className="print_month">
                                        {/* Month Name */}
                                        {`${toMonthName(event_month.month)} ${new Date(event_month.all_events_on_month[0][0].due_date).getFullYear()}`}
                                    </div>
                                    {/* Group of events */}
                                    { event_group }
                                </div>
                            )

                        }

                        // Renders elements
                        ReactDOM.render(
                            print_output,
                            document.getElementById('print_iframe')
                        )

                        // Debug
                        // console.log(sorted_events_by_date)

                        // Print dialog
                        window.print();
                    }
                })
            })
        }

        // completes all events shown
        function complete_redo_all_events(start_date = get_date().today, end_date = get_date().max_date, complete_all = true, search = false) {
            // Debug
            // console.log(start_date, end_date, search);

            const start_key = date_to_key(start_date);
            const end_key = date_to_key(end_date);


            const key_range = IDBKeyRange.bound(start_key, end_key);

            // Request to open database
            const open_request = window.indexedDB.open('student_file', 15);

            // Error messages
            open_request.addEventListener('blocked', () => {
                custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
            })
            

            open_request.addEventListener('error', () => {
                custom_alert("Failed to load database", 'error', "Failed to load database.", false);
            })
            
            open_request.addEventListener('success', () => {
                // Lets database equal result
                const db = open_request.result;
                const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');

                // Opens a cursor to cycle all events in the key range
                stored_events.openCursor(key_range).addEventListener('success', (e) => {
                    const cursor = e.target.result;

                    if (cursor) {
                        const days_events = cursor.value;

                        // Debug
                        // console.log(days_events)

                        for (const an_event of days_events) {
                            if (search !== false) {
                                if (an_event.description.toLowerCase().includes(search.toLowerCase())

                                || 
                                
                                an_event.title.toLowerCase().includes(search.toLowerCase())) 
                            
                                {
                                    an_event.completed = complete_all;
                                }
                            } else {
                                an_event.completed = complete_all;
                            }
                        }

                        // Pushes completed events to array
                        stored_events.put(
                            days_events,
                            cursor.key
                        )

                        // Moves to next day
                        cursor.continue()
                    } else {
                        // If no more keys left in the key range


                        // Debug
                        // console.log('finished')


                        show_events(
                            current_time_range,
                            current_sort_option,
                            current_timeline_option,
                            current_search,
                            current_order,
                            'time range'
                        );
                    }
                })
            })
        }

        function delete_all_events() {
            const start_key = date_to_key(current_time_range[0]);
            const end_key = date_to_key(current_time_range[1]);

            const key_range = IDBKeyRange.bound(start_key, end_key);

            // Request to open database
            const open_request = window.indexedDB.open('student_file', 15);

            // Error messages
            open_request.addEventListener('blocked', () => {
                custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
            })
            

            open_request.addEventListener('error', () => {
                custom_alert("Failed to load database", 'error', "Failed to load database.", false);
            })
            
            open_request.addEventListener('success', () => {
                // Lets database equal result
                const db = open_request.result;
                const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');

                // Opens a cursor to cycle all events in the key range
                stored_events.openCursor(key_range).addEventListener('success', (e) => {
                    const cursor = e.target.result;

                    if (cursor) {
                        // Debug
                        // console.log(days_events)

                        // If there is a search then it looks for the searchword 
                        // in the description or in the title
                        if (current_search !== false) {
                            const days_events = cursor.value;
                            const left_events = [];

                            for (const an_event of days_events) {
                                if (an_event.description.toLowerCase().includes(current_search.toLowerCase())

                                || 
                                
                                an_event.title.toLowerCase().includes(current_search.toLowerCase())) 
                            
                                {
                                } else {
                                    left_events.push(an_event);
                                }
                            }

                            // If there is no events then deletes the events in the key
                            if (left_events.length !== 0) {
                                // Pushes completed events to array
                                stored_events.put(
                                    left_events,
                                    cursor.key
                                )
                            } else {
                                stored_events.delete(cursor.key);
                            }
                            

                        } else {
                            stored_events.delete(cursor.key);
                        }

                        // Moves to next day
                        cursor.continue()
                    } else {
                        // If no more keys left in the key range


                        // Debug
                        // console.log('finished')


                        show_events(
                            current_time_range,
                            current_sort_option,
                            current_timeline_option,
                            current_search,
                            current_order,
                            'time range'
                        );
                    }
                })
            })

        }

        return (
            <div>
                <div id="full_calendar">
                    
                    <div className="search_and_sort">
                        <div className="search_bar_container">
                            <FontAwesomeIcon icon = {faSearch} size = 'lg' />
                            <input 
                                className = "search_bar"
                                aria-label = "search for events"
                                title = "Press Enter to search"
                                placeholder = "Search Events..."
                                onKeyDown = {(e) => {
                                    // Shows events on pressing enter
                                    // Primarily for mobile devices
                                    // clearTimeout(time_out);
                                    search_query_enter(e);
                                }}
                                // onBlur = {
                                //     // Shows events if element lost focus
                                //     (e) => {
                                //         current_search = e.target.value;

                                //         show_events(
                                //             current_time_range,
                                //             current_sort_option,
                                //             current_timeline_option,
                                //             current_search,
                                //             current_order
                                //         )
                                //     }
                                // }
                                onKeyUp = {
                
                                (e) => {
                                    // If desktop shows the events after 0.25 seconds after no typing
                                    check_desktop(function() {
                                        clearTimeout(time_out);
                                        time_out = setTimeout(function() {
                                            // Debug
                                            // console.log(e.target.value);
    
                                            current_search = e.target.value;
    
                                            show_events(
                                                current_time_range, 
                                                current_sort_option,
                                                current_timeline_option,
                                                current_search,
                                                current_order,
                                                'search value'
                                            )
                                        }, 250)
                                    })
                                }}

                            >
                                
                            </input>
                            <FontAwesomeIcon icon = {faTimes} size = '2x' title="Clear Search" 
                                onClick={(e) => {
                                    // gets the searchabar
                                    let search_bar = e.currentTarget.parentNode.querySelector('.search_bar');
                                    // If search bar value does not equal nothing, in which processing is not required
                                    // It sets the value of the search bar to null and then shows the events of the current
                                    // criteria.
                                    if (search_bar.value !== "") {
                                        search_bar.value = "";
                                        current_search = false;

                                        show_events(
                                            current_time_range,
                                            current_sort_option,
                                            current_timeline_option,
                                            current_search,
                                            current_order,
                                            'clear search'
                                        )
                                    }

                                }}
                            />
                        </div>

                        <ReactDropdown 
                            className = "drop_down_button time_range"
                            options = { time_range_options }
                            placeholder = 'Time Range'
                            ariaLabel = 'drop down for time range'
                            value = { time_range_options[1] }
                            onChange = {
                                (e) => {
                                    // This occurs when user selectes the time range
                                    let time_range;

                                    // If the selected label is changed it changes the current time range variable
                                    switch (e.label) {
                                        case 'All':
                                            // Time range is an array with 2 indexs,
                                            // Index 0 is start date for the events to be shown
                                            // Index 1 is end date
                                            // For all, just gets todays date and the max date
                                            time_range = [ get_date().today, get_date().max_date, 'all' ];
                                            break;
                                        case 'Today':
                                            // If selected day the time range index 0 and 1 is just the date 
                                            time_range = [get_date().today, get_date().today, 'day']
                                            break;
                                        case 'Selected Month':
                                            // If selected month then it gets the start of the month
                                            // For example if july gets 1st of July
                                            // Then it passes this to the get month function that outputs an array
                                            const current_month = new Date(`${calendar.currentYear}-${calendar.currentMonth + 1}-01`)

                                            time_range = get_month_day_range(current_month)
                                            break;
                                    }

                                    // Debug
                                    // console.log(time_range);
                                    

                                    current_time_range = time_range;

                                    // then shows the events

                                    show_events(
                                        time_range, 
                                        current_sort_option, 
                                        current_timeline_option, 
                                        current_search, 
                                        current_order,
                                        'time range'
                                    )
                                }
                            }
                            arrowOpen = 

                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronDown }/>
                                </span>
                            }

                            arrowClosed = 
                            
                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronLeft }/>
                                </span>
                            }
                        />


                        <ReactDropdown 
                            className = "drop_down_button"
                            options = { sort_options }
                            placeholder = { 'Sort By' }
                            value = { sort_options[0] }
                            ariaLabel = 'drop down for sort'
                            onChange = {
                                (e) => {

                                    // Gets the appropriate sort function
                                    let sort_function = false;
                                    let timeline_generator = false;


                                    switch (e.label) {
                                        case 'Due Date':
                                            sort_function = false;
                                            break;
                                        case 'Priority':
                                            sort_function = function(events_list) {                                                
                                                return bubble_sort_events_priority(events_list);
                                            }

                                            // Sets the timeline gen to an appropriate timeline creator function
                                            timeline_generator = function(events_list) {
                                                let prev_value;
                                                let return_list = [];
                                                let i = 0;

                                                
                                                // Returns a list for timeline
                                                while (i < events_list.length) {
                                                    if (events_list[i].priority !== prev_value) {
                                                        return_list.push(events_list[i].priority)
                                                        prev_value = events_list[i].priority;
                                                    } else {
                                                        return_list.push('');
                                                    }
                                                    i++
                                                }

                                                return return_list;
                                            }
                                            break;
                                        case 'Alphabet':
                                            // Timeline based on starting characters
                                            timeline_generator = function(events_list) {
                                                // Maintains previous value for comparions
                                                let prev_value;
                                                let return_list = [];
                                                let i = 0;

                                                while (i < events_list.length) {
                                                    // Checks if the character is a symbol
                                                    let starting_character = events_list[i].title.charAt(0);
                                                    const symbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                                                    const number = /[1234567890]/

                                                    if (symbol.test(starting_character)) {
                                                        starting_character = "Symbols";
                                                    }

                                                    if (number.test(starting_character)) {
                                                        starting_character = "Numbers"
                                                    }

                                                    // Returns a list for timeline
                                                    if (starting_character.toUpperCase() !== prev_value) {
                                                        return_list.push(starting_character.toUpperCase());
                                                        prev_value = starting_character.toUpperCase();
                                                    } else {
                                                        return_list.push('');
                                                    }
                                                    i++
                                                }

                                                return return_list;
                                            }


                                            
                                            sort_function = function(events_list) {
                                                return bubble_sort_events_alphabetically(events_list);
                                            };
                                            break;
                                        case 'Date Set':
                                            // console.log('Date set')
                                            break;
                                    }

                                    // Sets current sort option to the sort function
                                    current_sort_option = sort_function;

                                    current_timeline_option = timeline_generator;

                                    // Shows the events
                                    show_events(
                                        current_time_range, 
                                        sort_function, 
                                        timeline_generator, 
                                        current_search, 
                                        current_order,
                                        'sort option'
                                    )
                                }
                            }

                            arrowOpen = 

                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronDown }/>
                                </span>
                            }

                            arrowClosed = 
                            
                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronLeft }/>
                                </span>
                            }
                        />

                        <ReactDropdown 
                            className = "drop_down_button"
                            options = { completed_options }
                            placeholder = 'Completed'
                            ariaLabel = 'drop down for completed'
                            value = { completed_options[0] }
                            onChange = {
                                (e) => {
                                    if (e.label === 'Completed') {
                                        current_completed = true;
                                    } else if (e.label === 'Incomplete') {
                                        current_completed = false;
                                    } else {
                                        current_completed = e.label;

                                    }
                                    show_events(
                                        current_time_range,
                                        current_sort_option,
                                        current_timeline_option,
                                        current_search,
                                        current_order,
                                        'time range'
                                    )
                                }
                            }

                            arrowOpen = 

                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronDown }/>
                                </span>
                            }

                            arrowClosed = 
                            
                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronLeft }/>
                                </span>
                            }
                        />
                        <ReactDropdown 
                            className = "drop_down_button"
                            ariaLabel = 'drop down for order'
                            options = { order_options }
                            placeholder = {'Order'}
                            value = {order_options[0]}
                            onChange = { (e) => {
                                if (e.label === 'Descending') {
                                    current_order = true;
                                } else {
                                    current_order = false;
                                }

                                show_events(
                                    current_time_range, 
                                    current_sort_option, 
                                    current_timeline_option, 
                                    current_search, 
                                    current_order,
                                    'order'
                                );



                            }}
                            arrowOpen = 

                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronDown }/>
                                </span>
                            }

                            arrowClosed = 
                            
                            {
                                <span>
                                    <FontAwesomeIcon size = 'lg' icon = { faChevronLeft }/>
                                </span>
                            }                       
                        />
                    </div>
                    <div id = 'calendar_function_container'>
                        <div id = "calendar_container">
                        </div>
                        <div className="icon_button_container">
                            <button 
                                className="icon_button"
                                title="Add New Event"
                                aria-label = "add new event button"
                                onClick={() => {
                                    // Opens an event form
                                    Event_form(
                                        get_date().today, 
                                        get_date().today, 
                                        get_date().max_date, 

                                        // When clicks create adds new event
                                        function(title, desc, priority, due_date) {
                                            add_new_event_full(title, desc, priority, due_date)
                                        }, false
                                    )
                                }}
                            >
                                <FontAwesomeIcon icon = { faPlus } />
                            </button>
                            <button
                                className="icon_button"
                                title = {`Complete All Events Shown`}
                                aria-label = 'complete all shown events button'

                                onClick={() => {
                                    complete_redo_all_events(current_time_range[0], current_time_range[1], true, current_search)
                                }}
                            >
                                <FontAwesomeIcon icon = {faClipboardCheck}/>
                            </button>
                            <button
                                className = "icon_button"
                                title = 'Redo All Events Shown'
                                aria-label = "redo all events shown button"
                                onClick = {
                                    () => {
                                        complete_redo_all_events(current_time_range[0], current_time_range[1], false, current_search)
 
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = {faRotate} />
                            </button>
                            <button
                                className = "icon_button"
                                title="Download PDF file"
                                aria-label="download pdf file button"
                                onClick={
                                    () => {
                                        print_all_events();
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = { faFilePdf } />
                            </button>
                            <button
                                className="icon_button"
                                title = {`Delete All Events Show`}
                                aria-label = 'delete all events shown button'
                                onClick={
                                    () => {
                                        custom_alert(
                                            'Delete all events',
                                            'warning_yes_no',
                                            'Are you sure you want to delete these events? This action cannot be undone.',
                                            function() {
                                                delete_all_events();
                                            }, 
                                            
                                            function() {

                                            }
                                        )
                                    }
                                }
                            >
                                <FontAwesomeIcon icon = {faTrash}/>
                            </button>
                        </div>


                    </div>

                    <div id = "full_events">
                        <div id = "events_box">              

                

                        </div>  
                    </div>
                </div>
                <div
                    id="print_iframe"
                >

                </div>

            </div>
        )
    }
}

// SHow events in the selected day range. 
// day_range is an array first index is start second index is end
// Requires a sort function as parameter
// Requires a timeline gen function as parameter
// Requires a search query
// Requires an order
// Requires the recently changed value
export function show_events( day_range = current_time_range, sort_function = current_sort_option, timeline_generator = current_timeline_option, search_query = current_sort_option, descending = current_order, changed_value = false, completed = current_completed) {
    // Debug
    // console.log(day_range, sort_function);

    // Transforms day_range into key range
    const start_key = parseInt(day_range[0].replaceAll('-', ''));
    const end_key = parseInt(day_range[1].replaceAll('-', ''));
    const key_range = IDBKeyRange.bound(start_key, end_key);

    // all_events stores all the events in the key range
    let all_events = [];

    // Debug
    // console.log(start_key, end_key);

    const open_request = window.indexedDB.open('student_file', 15);

    // Error messages
    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })



    open_request.addEventListener('success', () => {

        // Gets stored events
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list')
        
        stored_events.openCursor( key_range ).addEventListener('success', (e) => {
            const cursor = e.target.result;
            
            if ( cursor ) {
                const day_events = cursor.value;

                // for (let i = 0; i < day_events.length; i++) {
                //     day_events[i]
                // }

                for (let i = 0; i < day_events.length; i++) {
                    day_events[i].key = parseInt(`${date_to_key(day_events[i].due_date)}${i}`);
                    day_events[i].order = i;
                    all_events.push(day_events[i]);
                }

                // Moves to next day
                cursor.continue();
            } else {
                const container = document.getElementById('events_box');
                let render_elements = [];
                let timeline_values = [];

                // console.log(all_events)

                if (sort_function !== false) {
                    // Applies sort function
                    sort_function(all_events);

                    // Debug
                    // console.log("Sorted events", sorted_events)
                }

                // Reverses the array if descending
                if (descending === true) {
                    all_events.reverse();
                }

                // Applies search query on events
                if (search_query !== false) {
                    let temp_events = [];
                    for (let i = 0; i < all_events.length; i++) {
                        if (all_events[i].description.toLowerCase().includes(search_query.toLowerCase())

                            || 
                            
                            all_events[i].title.toLowerCase().includes(search_query.toLowerCase())) 
                        
                            {



                            temp_events.push(all_events[i]);
                        }
                        
                    }
                    all_events = temp_events;
                }
                // If completed 
                if (completed !== 'Both') {
                    let temp_events = []
                    for (const an_event of all_events) {
                        if (an_event.completed === completed) {
                            temp_events.push(an_event)
                        }
                    }
                    all_events = temp_events;
                }




                if (timeline_generator === false) {
                    let prev_value;
                    for (let i = 0; i < all_events.length; i++) {
                        if (all_events[i].due_date !== prev_value) {
                            timeline_values.push(all_events[i].due_date);
                            prev_value = all_events[i].due_date;
                        } else {
                            timeline_values.push("");
                        }
                    }
                } else {
                    timeline_values = timeline_generator(all_events);
                }
                let current_group = [];

                for (let i = 0; i < all_events.length; i++) {
                    let description = all_events[i].description;


                    if (
                        description.replace(/\r?\n|\r/g, "") === '' 
            
                        || 
            
                        description.replace(/\s+/g, '') === ''
                    ) {
                        description = "This event has no description."
                    }

                    // Adds a seperator at the start of a new column
                    if (timeline_values[i] !== "") {
                        render_elements.push(
                            <div
                                className = "event_group"
                            >
                                { current_group }
                            </div>

                        )
                        current_group = [];
                    }

                    // Adds element to array which will be rendered
                    current_group.push(
                        <Event_item_full
                            title = { all_events[i].title }
                            description = { description }
                            priority = { all_events[i].priority }
                            due_date = { all_events[i].due_date }
                            days_left = { timeline_values[i] }
                            completed = { all_events[i].completed }
                            key = { all_events[i].key }
                            search = { current_search }
                            order = { all_events[i].order }
                        />
                    )
                }

                // Pushes last group, this is because the current group will be added but it won't add
                // the final group since the loop ends
                render_elements.push(
                    <div
                        className = "event_group"
                    >
                        { current_group }
                    </div>

                )
                current_group = [];

                // If search then does not unmount components
                if (changed_value !== 'search value' && changed_value !== false) {
                    ReactDOM.unmountComponentAtNode(document.getElementById('events_box'));
                }

                // ReactDOM.unmountComponentAtNode(document.getElementById('events_box'));
                // console.log(all_events)

                ReactDOM.render(render_elements, container);

                

                
            }

        });

    })





}

function initialise_full_calendar() {
    // Debug
    // console.log('initialise full calendar run!');

    let calendarConfig = {
        container: 'calendar_container',
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    }

    calendar = new RolyartCalendar(calendarConfig);

    current_time_range = get_month_day_range();
    current_sort_option = false;
    current_search = false;
    current_order = false;
    current_timeline_option = false;

    const open_request = window.indexedDB.open('student_file', 15)
    
    open_request.addEventListener('success', () => {
        remove_overdue_events(open_request.result)
    })

    // show_events( current_time_range, current_sort_option, current_timeline_option, current_search, current_order, false);
}

// Gets the months day range for show_events function
// Requires a date to input, ouputs the end of the month
// Default date is today
export function get_month_day_range(date = new Date()) {
    // For test date
    const current_date = new Date(date);


    // Gets the last day
    const year = current_date.getFullYear();
    const month = current_date.getMonth();
    let last_day = new Date(year, month + 1, 0);

    last_day = convert_date_to_str(last_day).date;   
    
    // Returns the current date to the last day
    return [convert_date_to_str(date).date, last_day, 'month']

}

// Removes overdue events
function remove_overdue_events(db) {

    // Debug
    // console.log('remove_overdue_events is run!')
    // Gets todays key
    const today_key = date_to_key(get_date().today)
    
    // Overdue keys is and indexedDB keyrange
    const overdue_keys = IDBKeyRange.upperBound(today_key, true);

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

                            console.log(todays_events)
                            // Puts new today's events plus new events to today
                            stored_events.put( todays_events, today_key );



                            // Closes database
                            db.close()


                            // Then shows the events today
                            show_events();
                        })




                    },

                    // Doesn't do anything
                    () => {
                        show_events();
                    }

                )
                    
            } else {
                
                // If no incomplete events just shows events today
                show_events()
            }


            // Finished reading events
            // console.log('finished reading events');
        }
    })


}

//External library that draws the calendar. https://www.cssscript.com/es6-calendar-rolyart/
export function RolyartCalendar(config){
    this.container = document.getElementById(config.container);
    this.container.classList.add('rolyart-calendar');
    this.today = new Date();
    this.selected  = this.today;
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.months = config.months;
    this.weekDays = config.weekDays;

    /** 
     * Calendar navigation
     * nextMonth()
     * prevMonth()
     */

    this.nextMonth = ()=>{
        if ( this.currentMonth == 11 ) {
            this.currentMonth = 0;
            this.currentYear = this.currentYear + 1;
        }
        else {
            this.currentMonth = this.currentMonth + 1;
        }
        this.showCalendar(this.currentYear, this.currentYear);
    }
    this.prevMonth = ()=>{
        if ( this.currentMonth == 0 ) {
            this.currentMonth = 11;
            this.currentYear = this.currentYear - 1;
        }
        else {
            this.currentMonth = this.currentMonth - 1;
        }
        this.showCalendar(this.currentYear, this.currentYear);
    }

    /** 
     * Get days of month
     * getPrevDays()
     * getNextDays()
     * getCurrentDays()
     */
    this.getPrevDays = (date, staDay=0)=>{
        let ret = [];
        let year = date.getFullYear();
        let month = date.getMonth();
        let firstWeekday =  new Date(year, month, 1).getDay();
        let days = (firstWeekday + 7) - (staDay +7) - 1;
        for (let i=days * -1; i<=0;i++){
            ret.push({date:new Date(year, month, i).getDate(), type:"not-current", id:new Date(year, month, i) });  
        }
        return ret;
    }
    this.getNextDays = (prevMonthDays, monthDays)=>{
        let ret = [];
        let days = 42 - (prevMonthDays.length + monthDays.length);
        for(let i = 1; i<=days; i++){
            ret.push({date:i, type:"not-current"});
        }
        return ret;
    }
    this.getCurrentDays = (date)=>{
        let ret = [];
        let year = date.getFullYear();
        let month = date.getMonth();
        let lastDay = new Date(year, month +1 , 0).getDate();
        for(let i = 1; i<=lastDay;i++){
            ret.push({date:i, type:"current", id:this.YYYYmmdd(new Date(year, month, i)) });
        }
        return ret;
    }

    /** 
     * YYYY-MM-DD date format
     * YYYYmmdd()
     */
    this.YYYYmmdd = (date)=>{
        let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        return [year, month, day].join('-');
    }

    this.calendarHeader = () =>{
        let header = document.createElement('header');
        header.classList.add('calendar-header');
        let monthAndYear = document.createElement('button');
        monthAndYear.className = `clickable_button`;
        let prevMonth = document.createElement('button');
        let currentMonth =  document.createElement('button');
        let nextMonth = document.createElement('button');

        monthAndYear.classList.add('month-year');
        monthAndYear.style.cursor = `pointer`;
        monthAndYear.title = `Return to current day`;
        monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
        
        prevMonth.innerHTML = '&#8249;';
        prevMonth.className = 'slide_button';
        prevMonth.ariaLabel = `previous month`;
        prevMonth.title = `Previous Month`;
        prevMonth.addEventListener('click', ()=>{
            this.prevMonth();
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;

            let animation = 'time range'
            if (current_time_range[2])
            // Shows the events on the day
            // Gets the current time range month, day or all
            switch (current_time_range[2]) {
                case 'day':
                    // If day sets the date range to the user selected date
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().today;
                    animation = false;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = this.currentMonth + 1;
                    const year = this.currentYear;
                    current_time_range = get_month_day_range(new Date(`${year}-${month}-01`));
                    break;
                case 'all':
                    // If all sets the date range to the max
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().max_date;
                    animation = false;
                    break;
            }

            // Then shows the events
            show_events(
                current_time_range,
                current_sort_option,
                current_timeline_option,
                current_search,
                current_order,
                animation
            );  
            
        })

        nextMonth.innerHTML = '&#8250;'
        nextMonth.className = `slide_button`
        nextMonth.ariaLabel = `next month`;
        nextMonth.title = `Next Month`;
        nextMonth.addEventListener('click', () => {
            this.nextMonth(); 
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;

            let animation = 'time range'
            // Shows the events on the day
            // Gets the current time range month, day or all
            switch (current_time_range[2]) {
                case 'day':
                    // If day sets the date range to the user selected date
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().today;

                    // No need for animation if it wont change
                    animation = false;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = this.currentMonth + 1;
                    const year = this.currentYear;

                    current_time_range = get_month_day_range(new Date(`${year}-${month}-01`));
                    break;
                case 'all':
                    // If all sets the date range to the max
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().max_date;
                    animation = false;
                    break;
            }

            // Then shows the events
            show_events(
                current_time_range,
                current_sort_option,
                current_timeline_option,
                current_search,
                current_order,
                animation
            );  

        })


        monthAndYear.addEventListener('click', () => {
            this.currentYear = new Date().getFullYear();
            this.currentMonth = new Date().getMonth();
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
            this.showCalendar();

            // Shows the events on the day
            // Gets the current time range month, day or all
            switch (current_time_range[2]) {
                case 'day':
                    // If day sets the date range to the user selected date
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().today;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = this.currentMonth + 1;
                    const year = this.currentYear;

                    current_time_range = get_month_day_range(new Date(`${year}-${month}-01`));
                    break;
                case 'all':
                    // If all sets the date range to the max
                    current_time_range[0] = get_date().today;
                    current_time_range[1] = get_date().max_date;
                    break;
            }

            // Then shows the events
            show_events(
                current_time_range,
                current_sort_option,
                current_timeline_option,
                current_search,
                current_order,
                'time range'
            );  
        })

        let weekDays = document.createElement('div');
        weekDays.classList.add('week-days');
        for(let i = 0; i<=6;i++){
            weekDays.innerHTML +=`<div>${this.weekDays[i]}</div>`;
        }

       currentMonth.classList.add('control-current-month');

        if (this.currentMonth === parseInt(get_date().month) - 1) {
            prevMonth.style.opacity = '0.2';
            prevMonth.style.pointerEvents = 'none';
        }
        
       header.appendChild(prevMonth)
       header.appendChild(monthAndYear)
       header.appendChild(nextMonth);
  
        this.container.appendChild(header);
        this.container.appendChild(weekDays);
    }

    this.showCalendar = (year, month)=>{
        this.container.innerHTML = '';
        this.calendarHeader();
        // this.calendarBody(year, month);
        
    }

    this.showCalendar(this.currentYear, this.currentMonth);
}


// Returns the user selected date
export function user_selected_date_full() {
    // console.log(document.querySelector('.selected'))
    const date_string = (document.querySelector('.selected')).id;
    const selected_date = new Date (date_string);
    const selected_day = selected_date.getDate();
    const selected_month = selected_date.getMonth() + 1;
    const selected_year = selected_date.getFullYear();

    // console.log(date_string)
    // console.log(selected_day, selected_month, selected_year)

    const return_values = {
        selected_date: date_string,
        selected_day: selected_day,
        selected_month: selected_month,
        selected_year: selected_year,
    }

    return return_values;
    
}