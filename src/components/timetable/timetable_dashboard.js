import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";
var item = ""
var Transition_time = ""
var Hover = ""

//variables that will be used later with the actual database
var current_time = new Date()
var current_period = 0
var statement = "END OF DAY"
var timetable_database = {
  "day_name": "Wednesday",
  "variation": false,
  "class_name": {
    1: "Maths Extension 2",
    3: "English advanced",
    4: "Latin"
  }, "routine": {
    1: "9:05",
    "Recess" : "11:10",
    3: "11:30",
    4: "12:35"
  }, "room": {
    1: "106",
    3: "208",
    4: "211"
  }, "teacher": {
    1: "Mr Parker",
    3: "Ms Pride",
    4: "Ms M"
  }, "start_bell": {
    1: "9:05",
    3: "11:30",
    4: "12:30"
  }, "end_bell": {
    1: "10:10",
    3: "12:30",
    4: "13:35"
  }
}

const line_height = 40;
let line_width = 75;
let stroke_width = 1.5;

if (window.screen.width < 1000) {
  line_width = 100;
  stroke_width = 4;
}

//Displaying today's classes
function Timetable() {
  const [clockState, setClockState] = useState();
  var timeleft = current_time.toString().split(" ")[4]
  //if (parseInt(timeleft.split(":")[0]) > 5) {
  //   statement = "period 5"
  // }
  useEffect(() => {
    setInterval(() => {
      current_time = new Date()
      timeleft = current_time.toString().split(" ")[4] //make a while loop that checks if the next_period end > current time > period end, if so, then change the period number by + 1
      if (parseInt(timeleft.split(":")[0]) > 1) {
        statement = "END OF DAY"

      }
      setClockState(timeleft)
    }, 1000)
  }, [])
  return (
    <div className="timetable">
      <div className="flex transition_time_container">
        <div className="center_vertical">
          <svg width={line_width} height={line_height}>
            <line className="left-to-right line" x1={0} y1={line_height / 2} x2={3 / 4 * line_width} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
          </svg>
          <div id="time_until_transition">{timeleft} until {statement}</div>
          <svg width={line_width} height={line_height}>
            <line className="right-to-left line" x1={line_width} y1={line_height / 2} x2={line_width / 4} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
          </svg>
        </div>
      </div>
      <div className="flex">
        <table id="daily_timetable">
          <tbody>
            <tr className="main_line"
              onMouseOver={(e) => Hover_table(e)}
              onMouseLeave={(e) => Time_out(e)}>
              <td className="period"><span>Period</span></td>
              <td className="room"><span>69</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// //sub routines of the timetable dashboard
// function period_line(period_number, data) {
//   var current_period = ""
//   for (item in data) {
//     current_period = item[2] //meant to be the name of the period
//     if (current_period == period_number.toString()) {
//       //if (current_period = "5") { --> use this if you want to make period 5 special
//       //return end of day one
//       return (<tr className="main_line"
//         onMouseOver={(e) => Hover(e)}
//         onMouseLeave={(e) => Time_out(e)}
//       >
//         <td className="period">---PERIOD VARIABLE--</td>
//         <td className="room">---PERIOD VARIABLE--</td>
//         <td className="teacher">---PERIOD VARIABLE--</td>
//       </tr>
//       );
//       //} //input else statement here to return breaks as a period
//     } //input else statement here if you want to display end of day as a period
//   }
// };


export default Timetable;