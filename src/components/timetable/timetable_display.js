//import { transform } from "@babel/core"; //Has issues with importing from babel
import React, { useEffect, useState } from "react";
import { Hover_table } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";
import Timetable_counter from "./timetable_countdown"
import Timetable_today_table from "./timetable_table"

//Displaying today's classes
function Display_today_timetable() {
  return (
    <div className="timetable">
      <Timetable_counter />
      <Timetable_today_table />
    </div>
  );
}

export default Display_today_timetable;