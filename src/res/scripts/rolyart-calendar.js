import { calendar_tutorial } from "../../components/dashboard/calendar_mini";
import { custom_alert } from "./add_alert";
import { Event_form, insert_event_to_DOM } from "./add_event";

//Right now events are stored not on database for testing
let events_list = [];
let timeoutID = 0

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
            if (monthAndYear.textContent === `${this.months[this.currentMonth]} ${this.currentYear}`) {
                show_events_today()
            }
        })

        nextMonth.innerHTML = '&#8250;'
        nextMonth.className = `slide_button show`
        nextMonth.ariaLabel = `next month`;
        nextMonth.title = `Next Month`;
        nextMonth.addEventListener('click', ()=>{
            this.nextMonth(); 
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
            if (monthAndYear.textContent === `${this.months[this.currentMonth]} ${this.currentYear}`) {
                show_events_today()
            }
        })


        monthAndYear.addEventListener('click', ()=>{
            this.currentYear = new Date().getFullYear();
            this.currentMonth = new Date().getMonth();
            monthAndYear.innerHTML = `${this.months[this.currentMonth] +' '+ this.currentYear}`;
            this.showCalendar();
            show_events_today();
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
                    if (selected.length > 0) { 
                        selected[0].className = selected[0].className.replace(" selected", "");
                    }         
                    cell.className += " selected";

                    show_events_today(); 
                }
            });

            //Click and holding on a calendar cell will open up event creation form
            cell.addEventListener('mousedown', (e)=>{
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
        
                        //Error checking
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (`${selected_year}-${selected_month}-${selected_day}`> max_date){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {
                            Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                        }
                    }, 350);
            }

            });

            //for mobile
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
        
                        //Error checking
                        if (selected_date < current_date) {
                            custom_alert('Please select a valid date','warning',`You cannot add events to previous days.`);
                        } else if (`${selected_year}-${selected_month}-${selected_day}`> max_date){
                            custom_alert('Please select a valid date', 'warning', 'Please select a due date within 10 years from today.')
                        } else {
                            Event_form(`${selected_year}-${selected_month}-${selected_day}`, today, max_date);
                        }
                    }, 350);
            }

            });

            cell.addEventListener('mouseup', () => {
                clearTimeout(timeoutID);
            })

            
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

//returns all events on the selected day
export function events_selected_day(date) {
    //console.log(events_list[0].due_date);
    let events_list_temp = [];
    for (const event_item of events_list) {
        if (event_item.due_date == date) {
            events_list_temp.push(event_item);
        }
    }
    return events_list_temp;
}

//Shows events on this day
export function show_events_today() {
    let selected_date = user_selected_date()
    let events_today
    let current_events = document.querySelector('#events_list');
    let current_completed_events = document.querySelector('#completed_events')
    
    events_today = events_selected_day(selected_date);

    calendar_tutorial()
    if (current_completed_events.querySelectorAll('li').length !== 0) {
        while(current_completed_events.firstChild){
            current_completed_events.removeChild(current_completed_events.firstChild);
        }
    }
    if (current_events.querySelectorAll('li').length !== 0) {
        while (current_events.firstChild){
            current_events.removeChild(current_events.firstChild);
        }
    }
    if (events_today.length !== 0) {
        for (const event_item of events_today) {
            insert_event_to_DOM(event_item.title, event_item.description, event_item.priority, event_item.due_date, event_item.completed)
        }
    }
    calendar_tutorial()
}

export function return_events_list() {
    return events_list;
}

export function user_selected_date() {
    let date = new Date;
    let selected_day = parseInt(document.querySelector('.selected').textContent);
    let selected_month = date.getMonth() + 1;
    const selected_year = date.getFullYear();
    let selected_date

    if (selected_month.toString().length === 1) {
        selected_month = `0${selected_month}`;
    }
    if (selected_day.toString().length === 1) {
        selected_day = `0${selected_day}`;
    }

    selected_date = `${selected_year}-${selected_month}-${String(selected_day)}`;
    return selected_date;
}

//Gets the current date and returns it
export function get_date() {
    let today = new Date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const date = {
        day: dd,
        month: mm,
        year: yyyy,
        today: `${yyyy}-${mm}-${dd}`,
        max_date: `${yyyy+10}-${mm}-${dd}`
    }
    return date;
}