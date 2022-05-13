export default function tt_weekly(props) {
    // Variable establishing
    var day = 1
    var timetable = []
    var day_timetable = []
    var period_timetable = []
    //console.log(props.raw.days)
    // Sorting the raw into days
    while (day <= (Object.keys(props.raw.days).length)) {

        // Displaying the day and allocating to the week
        day_timetable.push(
            <div className="period_day" key={`name-${props.raw.days[day].dayname.slice(0, -1)}`}>
                {props.raw.days[day].dayname.slice(0, -1)}
            </div>
        )
        // Checking which periods are on
        var periods_list = props.raw.days[day].routine.split(",")
        for (var period_index in periods_list) { // Sorts through the days
            if (Number.isInteger(parseInt(periods_list[period_index])) === true) {
                var key_value = periods_list[period_index] + "-" + day
                if (props.raw.days[day].periods[periods_list[period_index]] === undefined) { // If the period is a free or a break
                    period_timetable.push(
                        <div className="period_empty" key={`${props.raw.days[day].dayname}${key_value}`}>
                            <div className="period_number">
                                {periods_list[period_index]}
                            </div>
                            <div className="period_description">
                            </div>
                        </div>
                    )
                } else { // If the period has a class, then displays class details
                    period_timetable.push(
                        <div className="period_class" key={`${props.raw.days[day].dayname}${key_value}`}>
                            <div className="period_number">
                                {periods_list[period_index]}
                            </div>
                            <div className="period_description">
                                {props.raw.days[day].periods[periods_list[period_index]].title}
                            </div>
                        </div>
                    )
                }
            }
            //console.log(periods_list[period_index])
        }
        // The list containing today's periods are pushed to the week of days
        // This requires a seperate module because we need to nest it inside a div for CSS formatting
        day_timetable.push(
            <div className="day" key={props.raw.days[day].dayname}>
                {period_timetable}
            </div>
        )
        period_timetable = []
        // The list containing the week's day is pushed to the list of weeks
        if (props.raw.days[day].dayname.slice(0, -1) === "Fri") {
            timetable.push(
                <div className="week" key={props.raw.days[day].dayname.slice(-1)}>
                    {day_timetable}
                </div>
            )
            day_timetable = []
        }
        day += 1
    }
    return (
        <div className="timetable_cycle">
            {timetable}
        </div>
    )
}