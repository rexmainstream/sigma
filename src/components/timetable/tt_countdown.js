import React, { useEffect, useState } from "react";

// Returns the time left till next period
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    seconds = seconds % 60
    //minutes = seconds >= 30 ? minutes + 1 : minutes ---> used if u wanna round up
    minutes = minutes % 60
    hours = hours % 24
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}



// returns which period is next
function tt_countdown(props) {
    var current_time = (new Date()).toString().split(" ")[4]
    var i = 0
    //var eod = false
    var finish = false
    var total_seconds_today = (parseInt(current_time.slice(0, 2) - 0) * 3600000) + (current_time.slice(3, 5) * 60000) + parseInt(current_time.slice(6, 8) * 1000)
    while (i < props.raw.bells.length && finish === false) {
        current_time = (new Date()).toString().split(" ")[4]
        var total_seconds_period = props.raw.bells[i].startTime.split(":")[0] * 3600000 + props.raw.bells[i].startTime.split(":")[1] * 60000
        if (total_seconds_today > total_seconds_period) { // Checks if period has already begun
            if (i === (props.raw.bells.length - 1)) { // checks if it is last period (End of day)
                //eod = true
                break;
            } else { // Returns when the period ends
                var total_seconds_period_end = props.raw.bells[i].endTime.split(":")[0] * 3600000 + props.raw.bells[i].endTime.split(":")[1] * 60000
                if (total_seconds_today < total_seconds_period_end) { // Displays information
                    break;
                } else { // If period has already ended, checks next period
                    i += 1
                }
            }
        } else { // IF period starts later, then moves to displaying info on it
            break;
        }
    }

    return { i, current_time, total_seconds_period, total_seconds_today }
}


//returns the message to be sent
function tt_countdown_format(props) {

    // Variable Establishing
    var i = tt_countdown(props).i
    var total_seconds_period = tt_countdown(props).total_seconds_period
    var total_seconds_today = tt_countdown(props).total_seconds_today
    //console.log("Calculation has ended with variables:",current_time.slice(0, 2) - 10, new Date())
    var tt_message



    // This determines if it is a week end or not (If we need to display time left or not)
    if ((new Date()).toString().split(" ")[0] === "Sat" || (new Date()).toString().split(" ")[0] === "Sun") {
        tt_message = props.raw.timetable.timetable.dayname
        return tt_message
    }
    // This is if it is END OF DAY or not
    if (i === (props.raw.bells.length - 1)) { //This shows end of day when last in array
        tt_message = (
            <h3 className="countdown_title">{props.raw.bells[i].bellDisplay}</h3>
        )
    } else {
        //converting into miliseconds
        total_seconds_period = props.raw.bells[i].startTime.split(":")[0] * 3600000 + props.raw.bells[i].startTime.split(":")[1] * 60000
        var total_seconds_period_end = props.raw.bells[i].endTime.split(":")[0] * 3600000 + props.raw.bells[i].endTime.split(":")[1] * 60000

        // CHECKS IF PERIOD EXISTS OR NOT --> Converts "Period 2" to "Maths Extension 2"
        var period_name = props.raw.bells[i].bellDisplay

        if (Number.isInteger(parseInt(props.raw.bells[i].bellDisplay.slice(-1))) && props.raw.bells[i].bellDisplay.includes("Period")) {
            if (props.raw.timetable.timetable.periods[props.raw.bells[i].bellDisplay.slice(-1)] !== undefined) {
                period_name = props.raw.timetable.timetable.periods[props.raw.bells[i].bellDisplay.slice(-1)].title
            }
            //console.log(period_name, "THIS IS PERIOD NAme")
            for (var item in props.raw.timetable.subjects) {
                if (props.raw.timetable.subjects[item].shortTitle === period_name) {
                    period_name = props.raw.timetable.subjects[item].subject
                    period_name = period_name.split(" ").slice(0, -1).join(" ") //removes the last component "YR12"
                }
            }
        }
        //checking if period has started or not
        if (total_seconds_today > total_seconds_period) { // If the period has started, shows when it ends
            total_seconds_period = props.raw.bells[i].startTime.split(":")[0] * 3600000 + props.raw.bells[i].startTime.split(":")[1] * 60000
            var time_remaining = total_seconds_period_end - total_seconds_today

            tt_message = (
                <>
                    <h3 className="countdown_title">{period_name} Ends in</h3>
                    <p className="countdown_subtitle">{convertMsToHM(time_remaining)}</p>
                </>
            )
        } else { // If period hasnt started, shows when it starts
            total_seconds_period = props.raw.bells[i].startTime.split(":")[0] * 3600000 + props.raw.bells[i].startTime.split(":")[1] * 60000
            time_remaining = total_seconds_period - total_seconds_today

            tt_message = (
                <>
                    <h3 className="countdown_title">{period_name} Starts In</h3>
                    <p className="countdown_subtitle">{convertMsToHM(time_remaining)}</p>
                </>
            )
        }

    }
    return tt_message

}

//UI Design variables
const line_height = 40;
let line_width = 75;
let stroke_width = 1.5;

if (window.screen.width < 1000) {
    line_width = 100;
    stroke_width = 4;
}


export default function TT_countdown_display(props) {
    // To make the countdown refresh and show up to date timer
    var tt_messsage = tt_countdown_format(props)
    const [clockState, setClockState] = useState();
    useEffect(() => {
        setInterval(() => {
            var current_time_unformatted = new Date()
            var current_time = current_time_unformatted.toString().split(" ")[4]
            tt_messsage = tt_countdown_format(props)
            setClockState(current_time)
        }, 1000)
    }, [])

    return (
        <div className="timetable_countdown">
            <div className="center_vertical">
            <svg width={line_width} height={line_height}>
                <line className="left-to-right line" x1={0} y1={line_height / 2} x2={3 / 4 * line_width} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
            </svg>
            <div className="time_until_transition">{tt_countdown_format(props)}</div>
            <svg width={line_width} height={line_height}>
                <line className="right-to-left line" x1={line_width} y1={line_height / 2} x2={line_width / 4} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
            </svg>
            </div>
        </div>
    )
}

