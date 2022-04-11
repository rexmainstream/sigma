//This subroutine adds an event

import { Complete_event } from "../../components/checkmark_button";
import { calendar_tutorial } from "../../components/dashboard/calendar_mini";
import { create_modal, exit_modal } from "./add_modal";
import { string_validation } from "./data_validation";
import { Hide_checkmark, Hover_list_item, Show_checkmark, Time_out_list_item } from "./hover";


//Form for user input
export function Event_form(current_selected_date, today, max_date) {
    //form initialisation

    /* What it looks like 
    <div id="form">
        <input class="event_title">
        <div class="grid_wrapper">
            <label for="priority">Priority:</label>
            <div class="priority_radio_btn_container center_vertical">
                <input type="radio" name="priority">
                <input type="radio" name="priority">
                <input type="radio" name="priority">
            </div>
            <label for="due_date">Due Date:</label>
            <input class="event_due_date" type="date">
        </div>
        <textarea maxlength="2000"></textarea>
        <div>
            <button class="clickable_button">Create Event</button>
            <button class="clickable_button delete_button">Delete Event</button>
        </div>
    </div>
    */
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
    const delete_event_btn = document.createElement('button');

    form.id = 'form';
    center.className = 'center_vertical';
    title.className = 'event_title';
    grid.className = 'grid_wrapper';
    priority.className = 'priority_radio_btn_container center_vertical'
    due_date.className = 'event_due_date';
    create_event_btn.className = 'clickable_button';
    delete_event_btn.className = 'clickable_button delete_button';


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

    priority_label.innerHTML = 'Priority:';
    due_date_label.innerHTML = 'Due Date:'
    create_event_btn.innerHTML = 'Create Event';
    delete_event_btn.innerHTML = 'Delete';

    priority.append(priority1, priority2, priority3)
    grid.append(priority_label, priority, due_date_label, due_date);
    button_container.append(create_event_btn, delete_event_btn)
    form.append(title, grid, description_input, button_container)
    center.append(form);


    //Creates the form by appending the stuff into modal
    create_modal(`75vw`, true, center, true);


    //Adds event listeners to form items
    create_event_btn.addEventListener('click', (e) => {
        Add_new_event(e, title.value, description_input.value);
        //Add_new_event();
    })

    //If the value is not add title then the font colour is grey
    title.addEventListener('input', () => {
        if (title.value !== `Add Title`) {
            title.style.color = `black`
        }
    })

    description_input.addEventListener('input', () => {
        if (description_input.value !== `Description: Max 2000 characters`) {
            description_input.style.color = `black`
        }
    })

    title.addEventListener('click', select_all_input);
    description_input.addEventListener('click', select_all_input)
}


//This function executes when the user presses add new event. Adds the event to DOM and stores it in database
export function Add_new_event(e, title, description) {
    //console.log(title);
    //console.log(description);
    const event_container = document.getElementById('events_list');
    const event_item = document.createElement('li');
    const check_button = document.createElement('div');
    const checkmark = document.createElement('div');
    const event_desc = document.createElement('a');
 
    if (string_validation(title, 2, 50, 'title') === true) {
        checkmark.className = 'checkmark';
        check_button.setAttribute('title', 'Complete event'); 
        check_button.className = 'root_checkmark';
        event_item.ariaLabel = `list item for events`;
        event_item.classList.add('added_event');
        event_desc.className = 'event_item';
        event_desc.textContent = title;
        event_desc.setAttribute('href', '#');

        //Exits the modal
        exit_modal(e);
        //appends event into the event list
        check_button.append(checkmark);
        event_item.append(check_button);
        event_item.append(event_desc);
        event_container.append(event_item);
        

        //event listeners for animations
        check_button.addEventListener('mouseover', (e)=>{Show_checkmark(e);});
        check_button.addEventListener('mouseleave', (e)=>{Hide_checkmark(e);});
        check_button.addEventListener('click', (e)=>{Complete_event(e);});
        event_item.addEventListener('mouseenter', (e)=>{Hover_list_item(e);});
        event_item.addEventListener('mouseleave', (e)=>{Time_out_list_item(e);});

        event_item.addEventListener('animationend', () => {
            event_item.classList.remove('added_event');
        });

        //writes event into database
    }  
}

//Selects all the input text in the field
function select_all_input(e) {
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
}
