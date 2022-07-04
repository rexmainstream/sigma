// Imports
import Event_item from "./event_item";
import { custom_alert } from "../../res/scripts/add_alert";
import { Event_form } from "../../res/scripts/add_event";
import React from 'react';
import ReactDOM from 'react-dom'
import add_inline_animation from "../../res/scripts/animation_timing";
import Calendar_instruction from "./calendar_instructions";
import { CtxMenu, CtxMenuDefault, CtxCloseCurrentlyOpenedMenus, CtxMenuBlock } from "../../res/scripts/ctxmenu"


//Right now events are stored not on database for testing
let events_list = [];
let timeoutID = 0;


const ctx_menu_event = CtxMenu(".current");


// Adds new event
ctx_menu_event.addItem('Add Event', () => {
    const today = get_date().today;
    const max_date = get_date().max_date;

    // Debug
    // console.log(user_selected_date());

    Event_form(user_selected_date(), today, max_date);
})


// Completes all event on this day
ctx_menu_event.addItem('Complete All', () => {
    const open_request = window.indexedDB.open('student_file', 14);

    // Failed to open database messages

    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })


    open_request.addEventListener('success', () => {
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], "readwrite").objectStore('events_list');

        // Gets events stored in key
        const key = parseInt(user_selected_date().replaceAll('-', ''));
        const get_events_request = stored_events.get(key);


        get_events_request.addEventListener('success', () => {
            const events_today = get_events_request.result;

            // Loop to change completed status of all events
            for (const an_event of events_today) {
                an_event.completed = true;
            }


            // Debug
            // console.log(events_today)

            // Puts new events into databse
            stored_events.put(events_today, key);

            // Then shows events on the selected day
            show_events_today(user_selected_date(), false)
        })


    })


})


// Removes all events on this day
ctx_menu_event.addItem('Remove All', () => {
    const open_request = window.indexedDB.open('student_file', 14);

    // Failed to open database messages

    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })


    open_request.addEventListener('success', () => {
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], 'readwrite').objectStore('events_list');
        
        // Gets the key
        const key = parseInt(user_selected_date().replaceAll('-', ''));

        // Gets the events stored in the key
        stored_events.delete(key);

        show_events_today(user_selected_date(), undefined);        
    })
})







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
            
            if (selected_month === get_date().month && selected_year == get_date().year) {
                show_events_today(get_date().today, false);
            }
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
                show_events_today(get_date().today, false);
            }
        })


        monthAndYear.addEventListener('click', () => {
            this.currentYear = new Date().getFullYear();
            this.currentMonth = new Date().getMonth();
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
            this.showCalendar();
            show_events_today(get_date().today, false);
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
                        show_events_today(cell.id, false); 
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

                    show_events_today(cell.id, false); 
                }
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                const selected_date = new Date(user_selected_date());
                const current_date = new Date(`${get_date().year}-${get_date().month}-${parseInt(get_date().day)}`);


                if (selected_date < current_date) {
                    // Blocks context menu if the date is not valid
                    CtxMenuBlock(e.target);
                }         

                return false;
            }, false)

            //Click and holding on a calendar cell will open up event creation form
            cell.addEventListener('mousedown', (e)=>{
                // Gets the date to check that the date is valid
                let date = user_selected_date();


                // Gets current date for validation
                const current_date = new Date(`${get_date().year}-${get_date().month}-${parseInt(get_date().day)}`);
                const selected_date = new Date(date);
                const today = get_date().today;
                const max_date = get_date().max_date;

                //Prevents user from selected greyed out tiles
                if (e.currentTarget.classList.contains('not-current') === false) {
                    //Click and hold event
                    timeoutID = setTimeout(function() {


        
                        //Data Validation, can't select previous days
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (new Date(date) > new Date(max_date)){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {
                            console.log(current_date)
                            //Opens an event form with the current date already entered
                            Event_form(date, today, max_date);
                        }
                        //Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                    }, 350);
            }

            });

            //for mobile, same function
            cell.addEventListener('touchstart', (e)=>{
                // Gets the date to check that the date is valid
                let date = user_selected_date();


                // Gets current date for validation
                const current_date = new Date(`${get_date().year}-${get_date().month}-${parseInt(get_date().day)}`);
                const selected_date = new Date(date);
                const today = get_date().today;
                const max_date = get_date().max_date;

                //Prevents user from selected greyed out tiles
                if (e.currentTarget.classList.contains('not-current') === false) {
                    //Click and hold event
                    timeoutID = setTimeout(function() {


        
                        //Data Validation, can't select previous days
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (new Date(date) > max_date){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {
                            //Opens an event form with the current date already entered
                            Event_form(date, today, max_date);
                        }
                        //Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
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


// Shows events on the selected date.
// Errors with the frontend in this algorithm
export function show_events_today(date, add_event) {
    const open_request = window.indexedDB.open("student_file", 14);
    const events_container = document.querySelector('#events_container')
    const event_items = events_container.querySelectorAll('li');


    // Default date is today
    if (date === null || date === undefined) {
        date = get_date().today;
    }

    // Each array is stored in a key
    let key = parseInt(date.replaceAll("-", ""));
    

    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })

    open_request.addEventListener('success', () => {
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], "readonly").objectStore('events_list');

        // Gets events stored on the day
        const day_events_request = stored_events.get(key);

        day_events_request.addEventListener('success', () => {
            // Gets all the events on the day
            const today_events = day_events_request.result;

            const completed = [];
            const incomplete = [];

            let new_position;


            if (today_events !== undefined && today_events !== null && today_events !== false) {
                for ( let i = 0; i < today_events.length; i++ ) {


                    // Variables
                    const title = today_events[i].title;
                    const desc = today_events[i].description;
                    const priority = today_events[i].priority;
                    const due_date = today_events[i].due_date;
    
                    if ( today_events[i].completed === false ) {

                        // Gets new event position
                        if (i === add_event) {
                            if (today_events[i].completed === true) {
                                // New position stores if it is completed or not
                                new_position = [true, completed.length];
                            } else {
                                new_position = [false, incomplete.length];
                            }
                        }
    
                        // Adds event to incomplete list if the event is incomplete
                        incomplete.push(
                            <Event_item 
                                title = { title } 
                                desc = { desc } 
                                priority = { priority } 
                                order = { i }
                                due_date = { due_date }
                                completed = { false }
                                key = { i } 
                            />
                        )
                    } else {
    
                        // Adds event to complete list if event is completed
        
                        completed.push(
                            <Event_item 
                                title = { title } 
                                desc = { desc } 
                                priority = { priority } 
                                order = { i }
                                due_date = { due_date }
                                completed = { true }
                                key = { i }
                            />
                        )

                    }
                }

                

                if (add_event === false || add_event === undefined) {
                    // Removes the current events
                    if (event_items.length > 0) {
                        for (let i = 0; i < event_items.length; i++) {
                            ReactDOM.unmountComponentAtNode(document.getElementById('events_list'));
                            ReactDOM.unmountComponentAtNode(document.getElementById('completed_events'));    

                            // Render new events in events container
                            ReactDOM.render(completed, document.getElementById('completed_events'));
                            ReactDOM.render(incomplete, document.getElementById('events_list'));  

                        }
                    } else {
                        // Render new events in events container
                        
                        ReactDOM.render(completed, document.getElementById('completed_events'));
                        ReactDOM.render(incomplete, document.getElementById('events_list'));  

                        
                    }


                } else {
                    ReactDOM.render(completed, document.getElementById('completed_events'));
                    ReactDOM.render(incomplete, document.getElementById('events_list'));

                    
                    // If adding a new event requires the new index of the added event
                    if (Number.isInteger(add_event)) {
                        const events = document.getElementById('events_list').querySelectorAll('li');
                        const completed_events = document.getElementById('completed_events').querySelectorAll('li');
                        
                        // Debug

                        // console.log(new_position)
                        // console.log(events)
                        // console.log(completed_events)
                        // console.log(events[new_position[1]])


                        

                        for (let i = 0; i < events.length; i++) {
                            if (i === new_position[1] && new_position[0] === false) {
                                events[i].classList.add('added_event');
                            } else {
                                events[i].classList.remove('added_event');
                            }
                        }

                        for (let i = 0; i < completed_events.length; i++) {
                            completed_events[i].classList.remove('added_event');
                            console.log(i)
                        }
                    }
                }
            } else {
                // If no events on day
                
                for (let i = 0; i < event_items.length; i++) {
                    console.log('hello')
                    add_inline_animation(event_items[i], "complete_event", "0.4s", 'ease-in', 'both', '', () => {   

                        if (i === event_items.length - 1) {
                            // Empty current events
                            ReactDOM.unmountComponentAtNode(document.getElementById('events_list'));
                            ReactDOM.unmountComponentAtNode(document.getElementById('completed_events'));

                            // shows instructions
                            ReactDOM.render(<Calendar_instruction />, document.getElementById('events_list')); 
                        }
                    })
                }

                if (event_items.length === 0) {
                    ReactDOM.render(<Calendar_instruction />, document.getElementById('events_list')); 
                }


            }
            db.close();
        })
    })
}


//Gets the month from string, i.e. January will be converted to 1
export function getMonthFromString(mon){
    let month = new Date(Date.parse(mon +" 1")).getMonth()+1;
    if (month < 10) {
        month = `0${month}`;
    }
    return month;
}
 
//Gets the user selected date on the calendar
export function user_selected_date() {
    let date = new Date;
    let selected_day = parseInt(document.querySelector('.selected').textContent);
    let selected_month = document.querySelector('.month-year').textContent;
    selected_month = selected_month.split(" ");
    const selected_year = selected_month[1];
    selected_month = getMonthFromString(selected_month);


    let selected_date

    //Adds zero in front if one digit
    if (selected_month.toString().length === 1) {
        selected_month = `0${selected_month}`;
    }

    if (selected_day.toString().length === 1) {
        selected_day = `0${selected_day}`;
    }

    // Debug
    // console.log(selected_year)
    // console.log(selected_month)

    selected_date = `${selected_year}-${selected_month}-${String(selected_day)}`;
    return selected_date;
}

// Converts a date object to a string
export function convert_date_to_str(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;

    const return_date = {
        day: dd,
        month: mm,
        year: yyyy,
        // Today is today's date
        date: `${yyyy}-${mm}-${dd}`,
    }
    
    return return_date;


}

//Gets the current date and returns it in the form of string data type
export function get_date() {

    let today = new Date;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const date = {
        day: dd,
        month: mm,
        year: yyyy,
        // Today is today's date
        today: `${yyyy}-${mm}-${dd}`,
        

        // Max date is 10 years 
        max_date: `${yyyy+10}-${mm}-${dd}`
    }

    return date;
}