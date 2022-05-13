//This subroutine adds an event
import { Complete_event } from "../../components/checkmark_button";
import { calendar_tutorial } from "../../components/dashboard/calendar_mini";
import { custom_alert } from "./add_alert";
import { create_modal, exit_modal } from "./add_modal";
import { string_validation } from "./data_validation";
import { edit_event } from "./edit_event";
import { event_tooltip, tooltip_time_out } from "./event_tooltip";
import { Hide_checkmark, Hover_list_item, Show_checkmark, Time_out_list_item } from "./hover";
import { return_events_list, show_events_today, user_selected_date } from "./rolyart-calendar";
import { return_event_index } from "./search_and_sort_events";


//Form for user input
export function Event_form(current_selected_date, today, max_date) {
    //form initialisation
    const form = document.createElement('div');
    const center = document.createElement('div');
    const grid = document.createElement('div')
    const title = document.createElement('input');
    const priority_label = document.createElement('label');
    const priority = document.createElement('div')
    const priority1 = document.createElement('input');
    const priority2 = document.createElement('input');
    const priority3 = document.createElement('input');
    const due_date_label = document.createElement('label');
    const due_date = document.createElement('input');
    const description_input = document.createElement('textarea');
    const button_container= document.createElement('div');
    const create_event_btn = document.createElement('button');
    let modal_width = '75vw'
    //const delete_event_btn = document.createElement('button');

    form.id = 'form';
    center.className = 'center_vertical';
    title.className = 'event_title';
    grid.className = 'grid_wrapper';
    priority.className = 'priority_radio_btn_container center_vertical'
    due_date.className = 'event_due_date';
    create_event_btn.className = 'clickable_button';
    //delete_event_btn.className = 'clickable_button delete_button';


    priority1.setAttribute('type', 'radio');
    priority1.setAttribute('checked', 'checked')
    priority2.setAttribute('type', 'radio');
    priority3.setAttribute('type', 'radio');
    priority1.setAttribute('name', 'priority');
    priority2.setAttribute('name', 'priority');
    priority3.setAttribute('name', 'priority');
    priority_label.setAttribute('for', 'priority');
    priority.setAttribute('tabindex', 1);
    priority1.setAttribute('tabindex', 1);
    priority2.setAttribute('tabindex', 1);
    priority3.setAttribute('tabindex', 1);
    due_date.setAttribute('type', 'date');
    due_date.setAttribute('tabindex', 1)
    due_date.setAttribute('required', 'required')
    due_date_label.setAttribute('for', 'due_date');
    description_input.setAttribute('maxlength', '2000');
    description_input.setAttribute('tabindex', 0);
    title.setAttribute('placeholder', 'Add Title');
    title.setAttribute('required', 'required');
    title.setAttribute('autofocus', true)
    description_input.setAttribute('placeholder', 'Description: Max 2000 characters')
    title.setAttribute('type', 'text');
    due_date.setAttribute('value', current_selected_date);
    due_date.setAttribute('min', today);
    due_date.setAttribute('max', max_date);
    due_date.setAttribute('clear', false);
    due_date.setAttribute('onkeydown', 'return false');

    priority_label.innerHTML = 'Priority:';
    priority1.title = `Low`;
    priority2.title = `Medium`;
    priority3.title = `High`;
    due_date_label.innerHTML = 'Due Date:'
    create_event_btn.innerHTML = 'Create Event';
    //delete_event_btn.innerHTML = 'Delete';

    priority.append(priority1, priority2, priority3)
    grid.append(priority_label, priority, due_date_label, due_date);
    button_container.append(create_event_btn)
    form.append(title, grid, description_input, button_container)
    center.append(form);


    //Creates the form by appending the stuff into modal
    if (window.screen.width < 1000) {     
        modal_width = `90vw`;
    }
    create_modal(modal_width, true, center, true, false);

    //Focus on element
    title.focus();


    //Adds event listeners to form items
    create_event_btn.addEventListener('click', (e) => {
        Add_new_event(e, title.value, description_input.value, 
            priority.querySelector("input[name='priority']:checked").title,
            due_date.value, false);
        //Add_new_event();
    })


    title.addEventListener('dblclick', select_all_input);
    description_input.addEventListener('dblclick', select_all_input)
}


//This function executes when the user presses add new event. Adds the event to DOM and stores it in database
export function Add_new_event(e, title, description, priority, due_date) {
    if (string_validation(title, 2, 50, 'title') === true) {
        const new_event = new Event_constructor(title, description, priority, due_date, false); 
        //Adds event to events_list and writes to database
        return_events_list().push(new_event);

        add_event_to_db(new_event, return_events_list().length);


        //Adds event to DOM
        if (due_date === user_selected_date()) {
            calendar_tutorial()
            insert_event_to_DOM(title, description, priority, due_date, false)
        }
        
        //Exits the modal
        exit_modal(e);
    }  
}

export function add_event_to_db(event, index) {
    //If index does not need to be changed

    const open_request = window.indexedDB.open('student_file', 14);

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    });

    open_request.addEventListener('success', () => {
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], "readwrite").objectStore('events_list');

        //Puts new event into db
        stored_events.put(event, index);
    })


}

//THis function inserts the event to the DOM
export function insert_event_to_DOM(title, description, priority, due_date, completed) {
    let event_container
    const event_item = document.createElement('li');
    const check_button = document.createElement('div');
    const checkmark = document.createElement('div');
    const event_desc = document.createElement('a');
    const index = return_event_index(new Event_constructor(title, description, priority, due_date, completed));

    if (completed === false) {
        event_desc.setAttribute('title', 'Edit event');
        event_container = document.getElementById('events_list');
        check_button.setAttribute('title', 'Complete event');
    } else {
        event_desc.removeAttribute('title');
        event_container = document.getElementById('completed_events');
        check_button.setAttribute('title', 'Redo event');
    }

    checkmark.className = 'checkmark';
    check_button.className = 'root_checkmark';
    event_item.ariaLabel = `list item for events`;
    event_item.classList.add('added_event');
    event_item.classList.add(`${priority}_priority`);
    event_desc.className = 'event_item';
    event_desc.textContent = title;
    event_desc.setAttribute('href', '#');

    //appends event into the event list
    check_button.append(checkmark);
    event_item.append(check_button);
    event_item.append(event_desc);
    event_container.append(event_item);
    

    //event listeners for animations
    check_button.addEventListener('mouseover', (e)=>{Show_checkmark(e);});
    check_button.addEventListener('mouseleave', (e)=>{Hide_checkmark(e);});
    check_button.addEventListener('click', (e)=>{
        Complete_event(e, completed, index);});

    event_item.addEventListener('animationend', function handler() {
        event_item.classList.remove('added_event');
        event_item.addEventListener('mouseenter', (e)=>{Hover_list_item(e);});
        event_item.addEventListener('mouseleave', (e)=>{Time_out_list_item(e);});
        event_desc.addEventListener('click', (e) => {edit_event(e, index)});
        event_item.addEventListener('mouseenter', (evt) => {
            event_tooltip(evt, index);
            evt.stopPropagation();
        });
        event_item.addEventListener('mouseleave', (e) => {tooltip_time_out(e, 600)})
        event_item.removeEventListener('animationend', handler);
    });

}

//Selects all the input text in the field
export function select_all_input(e) {
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
}

//This function is a constructor for an event.
export function Event_constructor(title, description, priority, due_date, completed) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due_date = due_date;
    this.completed = completed;
}