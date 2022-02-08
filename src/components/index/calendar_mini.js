import React from "react";

export default function Calendar_mini() {
    return (
        <div className="box calendar">
            <div className="flex">
                <div id="mini_calendar">This is a static Calendar. This where a small calendar will be placed</div>
            </div>
            <div className="flex">
                <div id="mini_events">
                    This is a static box. THis is where an event list will be placed
                </div>
            </div>
        </div>
    );
}