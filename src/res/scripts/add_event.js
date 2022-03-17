//This subroutine adds an event

import { create_modal } from "./add_modal";

//Form for user input
export function Event_form() {
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
    title.className = 'event_title';
    grid.className = 'grid_wrapper';
    priority.className = 'priority_radio_btn_container center_vertical'
    due_date.className = 'event_due_date';
    create_event_btn.className = 'clickable_button';
    delete_event_btn.className = 'clickable_button delete_button';


    priority1.setAttribute('type', 'radio');
    priority2.setAttribute('type', 'radio');
    priority3.setAttribute('type', 'radio');
    priority1.setAttribute('name', 'priority');
    priority2.setAttribute('name', 'priority');
    priority3.setAttribute('name', 'priority');
    priority_label.setAttribute('for', 'priority');
    due_date.setAttribute('type', 'date');
    due_date_label.setAttribute('for', 'due_date');
    description_input.setAttribute('maxlength', '2000');

    title.textContent = 'Add Title';
    priority_label.innerHTML = 'Priority:';
    due_date_label.innerHTML = 'Due Date:'
    create_event_btn.innerHTML = 'Create Event';
    delete_event_btn.innerHTML = 'Delete Event';

    priority.append(priority1, priority2, priority3)
    grid.append(priority_label, priority, due_date_label, due_date);
    button_container.append(create_event_btn, delete_event_btn)
    form.append(title, grid, description_input, button_container)


    //Creates the form by appending the stuff into modal
    create_modal(`75vw`, true, form);


    //Adds event listeners to form items
}

export function Add_new_event() {
    //appends event into the event list


    //writes event into database
}


