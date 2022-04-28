import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";


export default function Timetable_cycle_table(props) {
    //console.log(props.raw_table)
    var display_format = (
        <>
        <p style={{margin: 50}}></p>
        <h2>{props.raw_table.student.BoSNumber} - {props.raw_table.student.givenname} {props.raw_table.student.surname}</h2>
        </>
    )
    var i = 1
    while (i <= 15) {
        //console.log(props.raw_table.days[i].dayname)
        display_format = display_format + (
            <p>{props.raw_table.days[i].dayname}</p>
        )
        i += 1
    }
    return (
        display_format
    )
}







// OLD VERSION 
//formatting api to readable/formatted type
// const format_cycle = ({ weekly_information }) => {
//     const cycle_info = weekly_information.days
//     const cycle_days = Object.keys(cycle_info)
//     const cycle_classes = Object.values(cycle_info)
//     const cycle_formatted = Object.entries(cycle_info)
//     return (
//         <>
//             <h1>Student Timetable</h1>
//             {cycle_formatted.map((day) => (
//                 console.log(day[1].dayname, day[1].periods[1]),
//                 <>
//                     <h2>{day[1].dayname}</h2>
//                 </>
//             ))}
//         </>
//     )
// }

// //exporting function and displaying
// function Timetable_cycle_table() {
//     return (
//         <div className="flex">
//             <table id="cycle_timetable" cellPadding={0} cellSpacing={0}>
//                 <h3>Below lies timetable cycle</h3>
//                 {format_cycle}
//             </table>
//         </div>
//     );
// }

// export default format_cycle;