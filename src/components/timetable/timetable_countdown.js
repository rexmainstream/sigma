//import { transform } from "@babel/core"; //Has issues with importing from babel
import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";

//Backend variables
var current_time = (new Date()).toString().split(" ")[4]
var current_period = 0
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
        0: "08:00",
        1: "09:05",
        3: "11:10",
        4: "12:30",
        5: "14:10",
    }, "end_bell": {
        0: "9:00",
        1: "11:05",
        3: "12:30",
        4: "13:35",
        5: "15:15",
    }
}

function check_timetable(today_data) {
    var final_message = ""
    var current_period_minutes_end = 0
    var current_period_minutes_start = 0
    var current_time_minutes = parseInt(current_time.split(":")[0]) * 60 + parseInt(current_time.split(":")[1])
    while (today_data.start_bell[current_period] == null && current_period <= 5) {
        if (current_period = 5) {
            time_left = ""
            return "END OF DAY"
        }
        current_period += 1
    }
    function updateminutes(data, period_number) {
        current_period_minutes_start = parseInt(data.start_bell[period_number].split(":")[0]) * 60 + parseInt(data.start_bell[period_number].split(":")[1])
        current_period_minutes_end = parseInt(data.end_bell[period_number].split(":")[0]) * 60 + parseInt(data.end_bell[(period_number)].split(":")[1])
    }
    updateminutes(today_data, current_period)
    // Check if the period has ended, if so then checks next period etc
    while ((current_period_minutes_end < current_time_minutes) && (current_period <= 5)) {
        current_period = current_period + 1
        while (today_data.start_bell[current_period] == null && current_period <= 5) {
            if (current_period = 5) {
                time_left = current_period_minutes_end - current_time_minutes
                time_left = ((time_left - time_left % 60) / 60).toString() + (time_left % 60).toString() + current_period_minutes_end.toString()
                time_left = ""
                return "End of Day"
            }
            current_period += 1
        }
        updateminutes(today_data, current_period)
    }
    time_left = current_period_minutes_end - current_time_minutes
    time_left = ((time_left - time_left % 60) / 60).toString() + ":" + (time_left % 60).toString() //displays time until end of next period, gotta fix. plus add seconds into this
    final_message = today_data.class_name[current_period]
    return final_message
}
statement = check_timetable(timetable_database)

//front end related variables and constants
const line_height = 40;
let line_width = 75;
let stroke_width = 1.5

if (window.screen.width < 1000) {
    line_width = 100;
    stroke_width = 4;
}

//Displaying timer
function Timetable_counter() {
    const [clockState, setClockState] = useState();
    current_time = (new Date()).toString().split(" ")[4]
    //if (parseInt(timeleft.split(":")[0]) > 5) {
    //   statement = "period 5"
    // }
    useEffect(() => {
        setInterval(() => {
            var current_time_unformatted = new Date()
            current_time = current_time_unformatted.toString().split(" ")[4] //make a while loop that checks if the next_period end > current time > period end, if so, then change the period number by + 1
            statement = check_timetable(timetable_database)
            setClockState(current_time)
        }, 1000)
    }, [])
    return (
        <div className="timetable">
            <div className="flex transition_time_container">
                <div className="center_vertical">
                    <svg width={line_width} height={line_height}>
                        <line className="left-to-right line" x1={0} y1={line_height / 2} x2={3 / 4 * line_width} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
                    </svg>
                    <div id="time_until_transition">{statement} <br></br>{time_left}</div>
                    <svg width={line_width} height={line_height}>
                        <line className="right-to-left line" x1={line_width} y1={line_height / 2} x2={line_width / 4} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Timetable_counter;