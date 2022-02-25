import React from "react";
import Main_line from "./main_lines";
import  Secondary_line from "./secondary_lines"
import Transition_time from "./transition_time"
import { Add_tabs } from "../../res/scripts/tabs";

export default function Timetable_mini() {
    return (
        <div className="timetable">
            <Transition_time />
            <div className="box">            
                <div id="timetable_container">
                    <div>
                        <button 
                            className="slide_button previous"
                            aria-label="Previous"
                            title="Previous"
                            aria-hidden="true">
                            &#8249;
                        </button>
                    </div>               
                    <table id="daily_timetable" cellPadding={0} cellSpacing={0}>
                        <tbody>
                            <Main_line />
                            <Secondary_line />
                            <Main_line />
                            <Secondary_line />
                            <Main_line />
                            <Secondary_line />
                            <Main_line />
                            <Secondary_line />
                            <Main_line />
                            <Secondary_line />
                        </tbody>
                    </table>
                    <div>
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
                    aria-hidden="false">
                </div>                 
            </div>
        </div>

    );
}

document.addEventListener('DOMContentLoaded', function() {Add_tabs(3);});



