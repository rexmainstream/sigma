import React from "react";
import { Event_constructor } from "../res/scripts/add_event";
import { edit_event } from "../res/scripts/edit_event";
import { Hide_checkmark, Hover_list_item, Show_checkmark, Time_out_list_item } from "../res/scripts/hover";
import { return_events_list } from "../res/scripts/rolyart-calendar";
import { return_event_index, return_index } from "../res/scripts/search_and_sort_events";
import { calendar_tutorial } from "./dashboard/calendar_mini";

export default function Checkmark_button() {
    return (
        <div className="root_checkmark"
            aria-label="complete event button"
            title="Complete Event"
            onMouseOver={(e) => Show_checkmark(e)}
            onMouseLeave={(e) => Hide_checkmark(e)}
            onClick={(e) => Complete_event(e)}>
            <div className="checkmark"></div>
        </div>
    );
}

//This function runs when the user presses complete event
export function Complete_event(e, completed, index) {
    const completed_event = e.currentTarget.parentElement;
    const event_temporary = completed_event.cloneNode(true);
    const checkmark = event_temporary.querySelector('.root_checkmark')
    const events_list = return_events_list()

    
    e.stopPropagation();

    //Plays animation
    completed_event.style.animation = `complete_event 0.3s ease-in both`;
    event_temporary.classList.add('added_event');

    completed_event.addEventListener('animationend', function handler() {
        //console.log('Animation ended');
        if (completed_event.parentElement.id === `events_list`) { 
            checkmark.setAttribute('title', 'Redo event');
            checkmark.parentElement.removeAttribute('title');
            document.querySelector('#completed_events').append(event_temporary);
        }else{
            checkmark.setAttribute('title', 'Complete event');
            checkmark.parentElement.setAttribute('title', 'Edit event');
            document.querySelector('#events_list').append(event_temporary);
            //add ability to edit the event
        }
        event_temporary.classList.remove('hovered_item');         
        completed_event.parentElement.removeChild(completed_event);                
        checkmark.querySelector('.checkmark').style.borderColor = 'transparent';
        checkmark.addEventListener('mouseover', (e)=>{Show_checkmark(e);});
        checkmark.addEventListener('mouseleave', (e)=>{Hide_checkmark(e);});
        checkmark.addEventListener('click', (e)=>{
            Complete_event(e, !completed, index);});

        //Changes the status of the completed
        if (completed === true) {
            events_list[index].completed = false;
            //events_list[return_event_index(new Event_constructor(title, description, priority, due_date, completed))].completed = false;
        } else {
            events_list[index].completed = true;
            //events_list[return_event_index(new Event_constructor(title, description, priority, due_date, completed))].completed = true;
        }

        event_temporary.addEventListener('animationend', function handler(){
            event_temporary.classList.remove('added_event');
            event_temporary.addEventListener('mouseenter', (e)=>{Hover_list_item(e);});
            event_temporary.addEventListener('mouseleave', (e)=>{Time_out_list_item(e);});
            if (events_list[index].completed === false) {
                event_temporary.addEventListener('click', (e) => {edit_event(e, index)});
            }       
            event_temporary.removeEventListener('animationend', handler);
        });


        

        calendar_tutorial();
        completed_event.removeEventListener('animationend', handler);    
    });
}