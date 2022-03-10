//Alex
import React from "react";
import { Hover_list_item } from "../../res/scripts/hover";
import { Time_out_list_item } from "../../res/scripts/hover";
import Check_button from "../checkmark_button";


//This subroutine exports the event list item that will be in the calendar 
export default function Events_list_item() {
    return (
        <li
            aria-label="list item for events"
            //This is a hover shadow function
            onMouseEnter={(e) => Hover_list_item(e)}
            onMouseLeave={(e) => Time_out_list_item(e)}>
            <Check_button />
            <a href="" className="event_item">Event example</a>
        </li>
    );
}