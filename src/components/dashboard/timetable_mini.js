//This contains the timetable framework that will display the tabs
import React from "react";
import Transition_time from "./transition_time"
import Today_timetable from "./timetable_today"; //Daily timetable, todays periods
import Weekly_timetable from "./timetable_week"; //Weekly timetable
import { Hover_buttons, Time_out_button, Show_element, Fade_out_element} from "../../res/scripts/hover";
import { Add_tabs } from "../../res/scripts/tabs";

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

document.addEventListener('DOMContentLoaded', function() {Add_tabs(3);});



