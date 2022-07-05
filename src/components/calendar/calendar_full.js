// Imports
import React from "react";
import ReactDOM  from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { RolyartCalendar, user_selected_date_full } from "./rolyart-calendar-full";
import { faL, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ReactDropdown from "react-dropdown";
import { convert_date_to_str, get_date } from "./rolyart-calendar";
import { custom_alert } from "../../res/scripts/add_alert";
import { bubble_sort_events_alphabetically, bubble_sort_events_priority } from "../../res/scripts/search_and_sort_events";
import Event_item_full from "./event_item_full";
import { check_desktop } from "../../res/scripts/check_mobile";
import { Event_form } from "../../res/scripts/add_event";
// import { return_current, show_events } from "./calendar_full";
import {  getMonthFromString } from "./rolyart-calendar";
import { date_to_key } from "./date_to_key";




let current_time_range;
let current_sort_option;
let current_timeline_option;
let current_search;
let current_order;
let timeoutID = 0


let time_out;

export default class Full_calendar extends React.Component {

    componentDidMount() {
        // Scrolls to top when user enters the page
        window.scrollTo(0, 0);
        initialise_full_calendar()
    }

    render() {

        const time_range_options = [
            {
                label: 'Selected Day'
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
                    current_order
                )
                e.target.blur();
            }

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
                                                current_order
                                            )
                                        }, 250)
                                    })
                                }}

                            >
                                
                            </input>
                            <FontAwesomeIcon icon = {faTimes} size = '2x' title="Clear Search" 
                                onClick={(e) => {
                                    e.currentTarget.parentNode.querySelector('.search_bar').value = "";
                                    current_search = false;

                                    show_events(
                                        current_time_range,
                                        current_sort_option,
                                        current_timeline_option,
                                        current_search,
                                        current_order
                                    )

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
                                    let time_range;

                                    switch (e.label) {
                                        case 'All':
                                            time_range = [ get_date().today, get_date().max_date, 'all' ];
                                            break;
                                        case 'Selected Day':
                                            time_range = [user_selected_date_full().selected_date, user_selected_date_full().selected_date, 'day']
                                            break;
                                        case 'Selected Month':
                                            const current_month = new Date(`${user_selected_date_full().selected_year}-${user_selected_date_full().selected_month}-01`)

                                            time_range = get_month_day_range(current_month)
                                            break;
                                    }

                                    // console.log(time_range);
                                    

                                    current_time_range = time_range;

                                    // Shows the events

                                    show_events(time_range, current_sort_option, current_timeline_option, current_search, current_order )
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
                                        current_time_range, sort_function, timeline_generator, current_search, current_order
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

                                show_events(current_time_range, current_sort_option, current_timeline_option, current_search, current_order);



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
                    <div id = "calendar_container">

                    </div>
                    <div id = "full_events">
                        <div id = "events_box">              

                

                        </div>  
                    </div>
                </div>

            </div>
        )
    }
}

// SHow events in the selected day range. 
// day_range is an array first index is start second index is end
export function show_events( day_range, sort_function = false, timeline_generator = false, search_query = false, descending = false ) {
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

    const open_request = window.indexedDB.open('student_file', 14);

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
                            <div className="event_separator">

                            </div>
                        )
                    }

                    // Adds element to array which will be rendered
                    render_elements.push(
                        <Event_item_full
                            title = { all_events[i].title }
                            description = { description }
                            days_left = { timeline_values[i] }
                            key = { all_events[i].key }
                            search = { current_search }
                        />
                    )
                    






                }

                // ReactDOM.unmountComponentAtNode(document.getElementById('events_box'));
                console.log(all_events)

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

    const calendar = new RolyartCalendar(calendarConfig);

    current_time_range = get_month_day_range();
    current_sort_option = false;
    current_search = false;
    current_order = false;
    current_timeline_option = false;

    show_events( current_time_range, current_sort_option, current_timeline_option, current_search, current_order);
}

// Gets the months day range for show_events function
// Requires a date to input, ouputs the end of the month
// Default date is today
export function get_month_day_range(date = new Date()) {
    // For test date
    const current_date = new Date(date);


    // Gets the last day
    const year = get_date().year;
    const month = current_date.getMonth();
    let last_day = new Date(year, month + 1, 0);

    last_day = convert_date_to_str(last_day).date;   
    
    // Returns the current date to the last day
    return [convert_date_to_str(date).date, last_day, 'month']

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
        prevMonth.className = 'slide_button show';
        prevMonth.ariaLabel = `previous month`;
        prevMonth.title = `Previous Month`;
        prevMonth.addEventListener('click', ()=>{
            this.prevMonth();
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
            
            //Gets the selected month
            //If selected month is current month shows events
            let selected_month = document.querySelector('.month-year').textContent;
            selected_month = selected_month.split(" ");
            let selected_year = selected_month[1];

            selected_month = getMonthFromString(selected_month);
            
            // Shows the events on the day
            // Gets the current time range month, day or all
            switch (current_time_range[2]) {
                case 'day':
                    // If day sets the date range to the user selected date
                    current_time_range[0] = user_selected_date_full().selected_date;
                    current_time_range[1] = user_selected_date_full().selected_date;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = user_selected_date_full().selected_month;
                    const year = user_selected_date_full().selected_year;

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
                current_order
            );  
            
        })

        nextMonth.innerHTML = '&#8250;'
        nextMonth.className = `slide_button show`
        nextMonth.ariaLabel = `next month`;
        nextMonth.title = `Next Month`;
        nextMonth.addEventListener('click', () => {
            this.nextMonth(); 
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;

            //Gets the selected month
            //If selected month is current month shows events
            let selected_month = document.querySelector('.month-year').textContent;
            selected_month = selected_month.split(" ");
            let selected_year = selected_month[1];

            selected_month = getMonthFromString(selected_month);
            
            if (selected_month === get_date().month && selected_year == get_date().year) {

            } else {
                // console.log('hello')

                document.getElementById('calendar_container').querySelector('.current').classList.add('selected')
            }

            // Shows the events on the day
            // Gets the current time range month, day or all
            switch (current_time_range[2]) {
                case 'day':
                    // If day sets the date range to the user selected date
                    current_time_range[0] = user_selected_date_full().selected_date;
                    current_time_range[1] = user_selected_date_full().selected_date;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = user_selected_date_full().selected_month;
                    const year = user_selected_date_full().selected_year;

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
                current_order
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
                    current_time_range[0] = user_selected_date_full().selected_date;
                    current_time_range[1] = user_selected_date_full().selected_date;
                    break;
                case 'month':
                    // If month sets the date range to the month
                    const month = user_selected_date_full().selected_month;
                    const year = user_selected_date_full().selected_year;

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
                current_order
            );  
        })

        let weekDays = document.createElement('div');
        weekDays.classList.add('week-days');
        for(let i = 0; i<=6;i++){
            weekDays.innerHTML +=`<div>${this.weekDays[i]}</div>`;
        }

       currentMonth.classList.add('control-current-month');
        
       header.appendChild(prevMonth)
       header.appendChild(monthAndYear)
       header.appendChild(nextMonth);
  
        this.container.appendChild(header);
        this.container.appendChild(weekDays);
    }
    
    this.calendarBody = (year, month)=>{
        year = this.currentYear;
        month = this.currentMonth;
        let date = new Date(year, month+1, 0);
        let daysPrevMonth = this.getPrevDays(date);
        let daysThisMonth = this.getCurrentDays(date);
        let daysNextMonth = this.getNextDays(daysPrevMonth, daysThisMonth);
        let calendarBody = document.createElement('div');
        calendarBody.classList.add('calendar-body');
        [...daysPrevMonth, ...daysThisMonth, ...daysNextMonth]
        .forEach(num=>{
            let cell = document.createElement('div');
            cell.setAttribute('id', num.id);
            cell.classList.add('day');
            let day = document.createElement('span');
            
            day.innerHTML = num.date;
            cell.appendChild(day);
            cell.addEventListener('mousedown', (e)=>{
                this.selected = num.id;         
                let selected = [].slice.call(document.getElementsByClassName("selected"));

                if (selected.includes(e.currentTarget) === false) {

                    // Prevents user from selected greyed out tiles
                    if (cell.classList.contains('not-current') === false) {
                        if (selected.length > 0) { 
                            selected[0].className = selected[0].className.replace(" selected", "");
                        }         
                        cell.className += " selected";

                        // Gets the current time range value stored in the select

                        // debug
                        // console.log(current_time_range[2]);

                        // Gets the current time range
                        switch (current_time_range[2]) {
                            // If a month sets the current month to the start of the month
                            case 'month':
                                // gets the current month
                                const current_month = new Date(`${user_selected_date_full().selected_year}-${user_selected_date_full().selected_month}-01`)
                                
                                // Lets the current time range into the month range
                                current_time_range = get_month_day_range(current_month);


                                break;
                            case 'day':
                                // If day sets the current time range to the single day
                                current_time_range = [
                                    user_selected_date_full().selected_date,
                                    user_selected_date_full().selected_date,
                                    'day'
                                ];

                                break;
                            case 'all':
                                // sets the current time range to the selected date and max date
                                current_time_range = [
                                    user_selected_date_full().selected_date,
                                    get_date().max_date,
                                    'all'
                                ]
                                
                                break;
                        }



                        // current_time_range = [user_selected_date_full().selected_date, user_selected_date_full().selected_date]
                        // console.log(user_selected_date_full())

                        // Shows the event
                        show_events(
                            current_time_range, current_sort_option, current_timeline_option, current_search, current_order
                        )
                    }
                }
            });

            cell.addEventListener('touchstart', (e)=>{
                this.selected = num.id;         
                let selected = [].slice.call(document.getElementsByClassName("selected"));

                if (selected.includes(e.currentTarget) === false) {
                    if (selected.length > 0) { 
                        selected[0].className = selected[0].className.replace(" selected", "");
                    }         
                    cell.className += " selected";

                }
            });

            //Click and holding on a calendar cell will open up event creation form
            cell.addEventListener('mousedown', (e)=>{
                let selected_day = parseInt(document.querySelector('.selected').querySelector("span").textContent);
                let selected_month = this.currentMonth + 1;
                const selected_year = this.currentYear;
                const current_date = new Date();
                const selected_date = new Date(`${selected_year}-${selected_month}-${String(selected_day+1)}`);
                const today = get_date().today;
                const max_date = get_date().max_date;

                //Prevents user from selected greyed out tiles
                if (e.currentTarget.classList.contains('not-current') === false) {
                    //Click and hold event
                    timeoutID = setTimeout(function() {

                        //Adds zero in front if one digit
                        if (selected_month.toString().length === 1) {
                            selected_month = `0${selected_month}`;
                        }
        
                        if (selected_day.toString().length === 1) {
                            selected_day = `0${selected_day}`;
                        }
        
                        //Data Validation, can't select previous days
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (`${selected_year}-${selected_month}-${selected_day}`> max_date){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {
                            // console.log(selected_date - current_date)
                            //Opens an event form with the current date already entered
                            Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                        }
                        //Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                    }, 350);
            }

            });

            //for mobile, same function
            cell.addEventListener('touchstart', (e)=>{
                let selected_day = parseInt(document.querySelector('.selected').textContent);
                let selected_month = this.currentMonth + 1;
                const selected_year = this.currentYear;
                const current_date = new Date();
                const selected_date = new Date(`${selected_year}-${selected_month}-${String(selected_day+1)}`);
                const today = get_date().today;
                const max_date = get_date().max_date;
                //Prevents user from selected greyed out tiles
                if (e.currentTarget.classList.contains('not-current') === false) {
                    timeoutID = setTimeout(function(){

                        //Adds zero in front if one digit
                        if (selected_month.toString().length === 1) {
                            selected_month = `0${selected_month}`;
                        }
        
                        if (selected_day.toString().length === 1) {
                            selected_day = `0${selected_day}`;
                        }
        
                        //Data validation, cant select previous days
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (`${selected_year}-${selected_month}-${selected_day}`> max_date){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {

                            //Opens an event form with the current date already entered
                            Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                        }
                    }, 350);
            }

            });

            //If the user stops holding clears the timeout
            cell.addEventListener('mouseup', () => {
                clearTimeout(timeoutID);
            })

            //For mobile
            cell.addEventListener('touchend', () => {
                clearTimeout(timeoutID);
            })

            cell.addEventListener('mouseleave', () => {
                clearTimeout(timeoutID);
            })



            num.type === 'not-current'?cell.classList.add('not-current'):cell.classList.add('current');
            if(num.id === this.YYYYmmdd(this.today)){
                cell.classList.add('active');
                cell.classList.add('selected');
            }
            calendarBody.appendChild(cell);
        })
        this.container.appendChild(calendarBody);
    }

    this.showCalendar = (year, month)=>{
        this.container.innerHTML = '';
        this.calendarHeader();
        this.calendarBody(year, month);
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