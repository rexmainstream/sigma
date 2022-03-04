import React from "react";
import Main_line from "./main_lines";
import  Secondary_line from "./secondary_lines"
import Lunch_line from "./lunch_lines";
import Recess_line from "./recess_line";

export default function Today_timetable() {
    return(
        <table id="daily_timetable" cellPadding={0} cellSpacing={0}>
            <tbody>
                <Main_line />
                <Secondary_line />
                <Main_line />
                <Secondary_line />
                <Lunch_line />
                <Main_line />
                <Secondary_line />
                <Recess_line />
                <Main_line />
                <Secondary_line />
                <Main_line />
                <Secondary_line />
            </tbody>
        </table>
    );
}

//This function finds the times for lunch and recess and appends these elements to the nodelist
function append_lunch_recess() {
    //Find the time lunch occurs
    //append element
    //Get time for lunch
    //write that to #time_for_lunch element

    //Find the time recess occurs
    //append element
    //Get time for recess
    //write that to #time_for_recess element
}