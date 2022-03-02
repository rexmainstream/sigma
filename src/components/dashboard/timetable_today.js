import React from "react";
import Main_line from "./main_lines";
import  Secondary_line from "./secondary_lines"

export default function Today_timetable() {
    return(
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
    );
}