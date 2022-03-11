//This contains the timetable framework that will display the tabs
import React from "react";
import Transition_time from "./transition_time"
import Today_timetable from "./timetable_today"; //Daily timetable, todays periods
import Weekly_timetable from "./timetable_week"; //Weekly timetable
import { Hover_buttons, Time_out_button, Show_element, Fade_out_element} from "../../res/scripts/hover";
import { Add_tabs } from "../../res/scripts/tabs";
import { Add_scroll_event, Scrolling_event } from "../../res/scripts/scroll";

export default function Timetable_mini() {
    return (
        <div className="timetable">
            <Transition_time />
            <div className="box">            
                <div id="timetable_container">
                    <div 
                        onMouseEnter={(e) => Hover_buttons(e)}
                        onMouseLeave={(e) => Time_out_button(e)}>
                        <button 
                            className="slide_button previous"
                            aria-label="Previous"
                            title="Previous"
                            aria-hidden="true">
                            &#8249;
                        </button>
                    </div>               
                    <Today_timetable />
                    <div 
                        onMouseEnter={(e) => Hover_buttons(e)}
                        onMouseLeave={(e) => Time_out_button(e)}>
                            <button 
                                className="slide_button next"
                                aria-label="next"
                                title="Next"
                                aria-hidden="true">
                                &#8250;
                            </button>
                    </div>
                </div>
                <div 
                    className="tab_container center_vertical"
                    role={'tablist'}
                    aria-hidden="false"
                    onMouseEnter={(e) => Show_element(e)}
                    onMouseLeave={(e) => Fade_out_element(e)}>                 
                </div>                 
            </div>
        </div>

    );
}


//THis function shows the header if user scrolls up and hides it if the user scrolls down
function Intuitive_header_reveal_hide() {
    let hidden = false;
    let header = document.querySelector('header')
    Scrolling_event(document,'up',()=>{   
        if (hidden === true || window.offsetHeight === 0) {
            header.style.animation = null;
            header.style.animation = `show_header 0.5s ease-out both`;
            hidden = false;
        }


        //console.log('Show the header');
    });
    Scrolling_event(document,'down',()=>{
        if (hidden === false) {
            header.style.animation = null;           
            header.style.animation = `hide_header 0.5s ease-out both`
            hidden = true;
        }

        //console.log('Hide the header');
    });

}

export function initialise_timetable() {
    Add_tabs(3);
    Intuitive_header_reveal_hide();

    //This is for the header

    //Add more stuff later
}



