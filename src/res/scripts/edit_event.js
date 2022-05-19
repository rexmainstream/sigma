import { calendar_tutorial } from "../../components/dashboard/calendar_mini";
import { custom_alert } from "./add_alert";
import { add_event_to_db, Event_constructor, Event_form, insert_event_to_DOM } from "./add_event";
import { exit_modal } from "./add_modal";
import { string_validation } from "./data_validation";
import { get_date, return_events_list, show_events_today, user_selected_date } from "./rolyart-calendar";
import { sort_events_by_date } from "./search_and_sort_events";

let db

//Edits the event
export function edit_event(e, index) {
    const events_list = return_events_list();
    const event_date = events_list[index].due_date;
    const today = get_date().today;
    const max_date = get_date().max_date
    let form
    let title
    let radio_button
    let description
    let button_container
    let edit_button = document.createElement('button');
    let delete_button = document.createElement('button');
    let due_date

    //Creates the new modal
    Event_form(event_date, today, max_date);

    //Adds in the event values automatically
    form = document.querySelector('#form')
    title = form.querySelector('.event_title');
    description = form.querySelector('textarea');
    radio_button = form.querySelector(`input[title="${events_list[index].priority}"]`);
    button_container = form.querySelector('.clickable_button').parentElement;
    due_date = form.querySelector('.event_due_date');

    title.value = events_list[index].title;
    title.style.color = `black`;
    description.value = events_list[index].description;
    description.style.color = `black`;
    radio_button.checked = 'true';
    button_container.removeChild(button_container.querySelector('button'));
    delete_button.textContent = 'Delete event';
    delete_button.classList.add('clickable_button', 'delete_button');
    edit_button.className = 'clickable_button';
    edit_button.textContent = 'Edit Event';
    button_container.append(edit_button, delete_button);

    //Edit and delete button event listeners

    edit_button.addEventListener('click', (evt) => {
        if (string_validation(title.value, 2, 50, 'title') === true) {
            exit_modal(evt);
            events_list[index].title = title.value;
            events_list[index].description = description.value;
            events_list[index].priority = form.querySelector("input[name='priority']:checked").title;
            events_list[index].due_date = due_date.value;

            //Sort events
            sort_events_by_date();
            //Add event to db
            add_event_to_db(events_list[index], index + 1);

            //Adds event to DOM and removes old event
            document.querySelector('#events_list').removeChild(e.target.parentElement)
            if (events_list[index].due_date === user_selected_date()) {
                insert_event_to_DOM(events_list[index].title, events_list[index].description, events_list[index].priority, events_list[index].due_date, false);
            } else {
                show_events_today();
                calendar_tutorial();
            }            
        }
    })

    //When user presses delete button, deletes the event from from
    delete_button.addEventListener('click', (evt) => {
        const open_request = window.indexedDB.open('student_file', 14);

        open_request.addEventListener('error', () => {
            custom_alert("Failed to load database", 'error', "Failed to load database.", false);
        });

        open_request.addEventListener('success', () => {
            db = open_request.result;
            const stored_events = db.transaction(['events_list'], "readwrite").objectStore('events_list');

            const database_length = stored_events.count()        
            database_length.addEventListener('success', () => {
                for(let i = (index + 1); i < (database_length.result); i++) {
                    add_event_to_db(events_list[i], i);
                }
                stored_events.delete(database_length.result);

                events_list.splice(index, 1);
                show_events_today();
            })
        })
        exit_modal(evt);
    })
}
