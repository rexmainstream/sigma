// Imports
import { custom_alert } from "./add_alert";
import { create_modal, exit_modal } from "./add_modal";
import { show_events_today } from "../../components/calendar/rolyart-calendar";
import { sort_events_alphabetically } from "./search_and_sort_events";

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
    })


    title.addEventListener('dblclick', select_all_input);
    description_input.addEventListener('dblclick', select_all_input)
}


//This function executes when the user presses add new event. Adds the event to DOM and stores it in database
export function Add_new_event(e, title, description, priority, due_date) {
    const the_event = new Event_constructor(title, description, priority, due_date, false);
    const arr_events = [the_event, the_event];
    const open_request = window.indexedDB.open("student_file", 14);

    // The key of the index is the day which is unique
    const key = parseInt(due_date.replaceAll("-", ""));

    // Each day has an array of events

    open_request.addEventListener('blocked', () => {
        custom_alert('Please close other tabs of this site open', 'warning', "Failed to load database", false);
    })
    

    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    })

    open_request.addEventListener('success', () => {
        const db = open_request.result;
        const stored_events = db.transaction(['events_list'], "readwrite").objectStore('events_list');

        // Gets the current events of the day
        const get_current_events = stored_events.get(key)
        
        get_current_events.addEventListener('success', () => {
            let curr_events = get_current_events.result;
            let new_position;
           
            // If no current events just adds the event to the index
            // If current events exist then adds sorted array
            if (curr_events !== undefined && curr_events !== null) {

                new_position = sort_events_alphabetically(curr_events, the_event);
    
                
                // Then adds sorted array to the day
                stored_events.put(curr_events, key);
            } else {
                stored_events.put([the_event], key);
            }

            show_events_today(document.querySelector('.selected').id, new_position);

        })

        // stored_events.addEventListener('complete', () => {
        //     db.close();
        // })
    })



    exit_modal(e);
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