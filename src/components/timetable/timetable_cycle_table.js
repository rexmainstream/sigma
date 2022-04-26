import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";

//Backend variables



//template
const format_cycle = () => {
    return (
        <div className="timetablecycle">
            <>
                <h3>{day.days.dayname.split(" ")[0]}</h3>
                {day.days.periods.map((period) => (
                    <>
                    <h3>{period.title}</h3>
                    <h2>{period.room}</h2>
                    </>
                ))}
            </>
        </div>
    )
}



//exporting function and displaying
function Timetable_cycle_table() {
    return (
        <div className="flex">
            <table id="cycle_timetable" cellPadding={0} cellSpacing={0}>
                <tbody>
                    {Mini_timetable(timetable_database)}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable_cycle_table;