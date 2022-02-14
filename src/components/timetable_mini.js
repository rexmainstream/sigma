import React from "react";
import Main_line from "./main_lines";
import  Secondary_line from "./secondary_lines"
import Transition_time from "./transition_time"

export default function Timetable_mini() {
    return (
        <div className="box timetable">
            <div className="tab_container">
                <p className="tab">My Day</p>{/*Probably change this to a component*/}
                <p className="tab">Timetable</p>
            </div>
            <Transition_time />
            <div className="flex">
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