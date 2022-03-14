import React from "react";
import { Hide_checkmark, Show_checkmark } from "../res/scripts/hover";
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

let currently_playing_animation = false;

//This function runs when the user presses complete event
function Complete_event(e) {
    const completed_event = e.currentTarget.parentElement;
    currently_playing_animation = true;
    
    //Plays animation
    completed_event.style.animation = `complete_event 0.3s ease-in both`;

    completed_event.onanimationend = () => {
        //console.log('Animation ended');        
        completed_event.parentElement.removeChild(completed_event);
        calendar_tutorial();
        currently_playing_animation = false;
        //Remove the event from the database
    }
}

export function Return_currently_playing_animation() {
    return currently_playing_animation;
}
