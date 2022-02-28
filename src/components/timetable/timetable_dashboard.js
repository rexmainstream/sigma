//Final call function
export default function Dashboard() {
  return (
    <div className="box timetable">
      <div className="tab_container">
        <p className="tab">My Day</p>{/*Probably change this to a component*/}
        <p className="tab">Timetable</p>
      </div>
      <Transition_time />
      <div className="flex">
        <table id="daily_timetable">
          <tbody>
            <period_line />
          </tbody>
        </table>
      </div>
    </div>
  );
}

//sub routines of the timetable dashboard
export default function period_line(period_number, data) {
  var current_period = ""
  for (item in data) {
    current_period = item[2] //meant to be the name of the period
    if (current_period == period_number.toString()) {
      //if (current_period = "5") { --> use this if you want to make period 5 special
      //return end of day one
      return (<tr className="main_line"
        onMouseOver={(e) => Hover(e)}
        onMouseLeave={(e) => Time_out(e)}
      >
        <td className="period">---PERIOD VARIABLE--</td>
        <td className="room">---PERIOD VARIABLE--</td>
        <td className="teacher">---PERIOD VARIABLE--</td>
      </tr>
      );
      //} //input else statement here to return breaks as a period
    } //input else statement here if you want to display end of day as a period
  }
};
return (
  <tr className="main_line"
    onMouseOver={(e) => Hover(e)}
    onMouseLeave={(e) => Time_out(e)}
  >
    <td className="period">Period</td>
    <td className="room">69</td>
  </tr>
);

export default function Transition_time() {
  return (
    <div>
      <p id="next_period">Transition</p>
      <p>in</p>
      <div className="center_vertical">
        <svg width={line_width} height={line_height}>
          <line className="left-to-right line" x1={0} y1={line_height / 2} x2={3 / 4 * line_width} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
        </svg>
        <b id="time_until_transition">5:01</b>
        <svg width={line_width} height={line_height}>
          <line className="right-to-left line" x1={line_width} y1={line_height / 2} x2={line_width / 4} y2={line_height / 2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
        </svg>
      </div>
    </div>
  );
}