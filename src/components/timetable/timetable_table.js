import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";

//Backend variables
var current_time = (new Date()).toString().split(" ")[4]
var current_period = 0
var period_number = 0
var time_left = 0
var statement = ""
var timetable_database = {
    "day_name": "Wednesday",
    "variation": false,
    "class_name": {
        0: "Maths Extension 1",
        1: "Maths Extension 2",
        3: "English advanced",
        4: "Latin",
        5: "Engineering",
    }, "routine": {
        0: "8:00",
        1: "9:05",
        "Recess": "11:10",
        3: "11:30",
        4: "12:35",
        "Lunch": "1:30",
        5: "2:10",
    }, "room": {
        0: "104",
        1: "106",
        3: "208",
        4: "211",
        5: "505",
    }, "teacher": {
        0: "Mr Fuller",
        1: "Mr Parker",
        3: "Ms Pride",
        4: "Ms M",
        5: "Mr Giffo",
    }, "start_bell": {
        0: "8:00",
        1: "9:05",
        3: "11:10",
        4: "12:30",
        5: "2:10",
    }, "end_bell": {
        0: "9:00",
        1: "11:05",
        3: "12:30",
        4: "13:35",
        5: "3:15",
    }
}

//sub routines of the timetable dashboard
function Mini_timetable(today_data) {
    var fake_period_number = 0
    var current_period_counter = ""
    var final = ""
    var period_list = []
    var period_display
    for (var item in today_data.routine) {
        period_list.push(item)
    }
    for (var item in today_data.routine) {
        current_period_counter = item //meant to be the name of the period, returns as either 1,2, recess, 3, lunch, 4, 5x
        //period_list.push(current_period)
        //period_list.push(fake_period_number)
        while (fake_period_number <= current_period_counter) {
            //period_list.push(current_period_counter)
            //period_list.push(fake_period_number)
            if (current_period_counter === fake_period_number.toString()) {
                //if (current_period = "5") { --> use this if you want to make period 5 special
                //return end of day one
                period_display = (
                    <tr className="main_line" onMouseLeave={(e) => Time_out(e)}>
                        <td className="period">{today_data.class_name[item]}</td>
                        <td className="room">{today_data.room[item]}</td>
                        <td className="teacher">{today_data.teacher[item]}</td>
                    </tr>
                )
                period_list.push(period_display)
                fake_period_number = fake_period_number + 1
                //} //input else statement here to return breaks as a period
            } else {
                if (current_period_counter == "Recess") {
                    period_list.push("True")
                } else {
                    period_list.push("False")
                }
                if ((current_period_counter == "Recess") || (current_period_counter == "Lunch")) {
                    //if (current_period = "5") { --> use this if you want to make period 5 special
                    //return end of day one
                    period_display = (
                        <tr className="main_line" onMouseLeave={(e) => Time_out(e)}>
                            <td className="period">{current_period_counter}</td>
                            <td className="room"> {today_data.routine[item]}</td>
                        </tr>
                    )
                    period_list.push(period_display)
                } else {
                    // period 3 but its reccess there
                    period_display = (
                        <tr className="main_line" onMouseLeave={(e) => Time_out(e)}>
                            <td className="period">Period {fake_period_number}</td>
                            <td className="room"> -</td>
                        </tr>
                    )
                    period_list.push(period_display)
                    //fake_period_number = fake_period_number + 1
                }
                fake_period_number = fake_period_number + 1
                //input else statement here if you want to display end of day as a period
            }
        }
    }
    return period_list
};

function Timetable_today_table() {
    return (
        <div className="flex">
            <table id="daily_timetable" cellPadding={0} cellSpacing={0}>
                <tbody>
                    {Mini_timetable(timetable_database)}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable_today_table;