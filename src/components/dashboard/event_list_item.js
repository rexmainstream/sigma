import React from "react";
import { Hover_list_item } from "../../res/scripts/hover";
import { Time_out_list_item } from "../../res/scripts/hover";
import Check_button from "../checkmark_button";


//This subroutine exports the event list item that will be in the calendar 
export default function Events_list_item() {
    return (
        <li
            aria-label="list item for events"
            onMouseEnter={(e) => Hover_list_item(e)}
            onMouseLeave={(e) => Time_out_list_item(e)}
            onClick={(e) => Complete_event(e)}>
            <Check_button />
            <a href="" className="event_item">Event example</a>
        </li>
    );
}

//This function runs when the user presses complete event
function Complete_event(e) {
    //Plays animation, translates the previous element up and the removes the completed event

    //Removes event from the list and puts it at the end with line-through and grey font styling
}