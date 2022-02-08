import React from "react";
import Main_line from "./main_lines";
import  Secondary_line from "./secondary_lines"

export default function Timetable_mini() {
    return (
        <div class="box timetable">
            <div class="tab_container">
                <p class="tab">My Day</p>
                <p class="tab">Timetable</p>
            </div>
            <p id="next_period">Transition</p>
            <p>in</p>
            <p><b id="time_until_transition">5:01</b></p>
            <div class="flex">
                <table id="daily_timetable">
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
            </div>                    
        </div>
    );
}