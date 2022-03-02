var item = ""
var Transition_time = ""
var Time_out = ""
var Hover = ""

//Final call function
function Dashboard() {
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
function period_line(period_number, data) {
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
