export default function tt_weekly(props) {
    // Variable establishing
    var day = 1
    var timetable = []
    var day_timetable = []
    var period_header_table = []
    var period_timetable = []

    function highlight_classes(e) {
        const the_class = e.target.classList[1];
        const same_classes = document.getElementsByClassName(the_class);

        for (const class_element of same_classes) {
            class_element.classList.add('hovered_class');
        }
    }

    function highlight_classes_time_out(e) {
        const the_class = e.target.classList[1];
        const same_classes = document.getElementsByClassName(the_class);

        for (const class_element of same_classes) {
            class_element.classList.remove("hovered_class");
        }
    }
    // Sorting the raw into days
    while (day <= (Object.keys(props.raw.days).length)) {

        // Display the headers of each day e.g "Mon"
        period_header_table.push(
            <td className="period_cycle_day" key={`name-${props.raw.days[day].dayname.slice(0, -1)}`}>
                {props.raw.days[day].dayname.slice(0, -1)}
            </td>
        )
        // Checking which periods are on
        var periods_list = props.raw.days[day].routine.split(",")
        for (var period_index in periods_list) { // Sorts through the days
            if (Number.isInteger(parseInt(periods_list[period_index])) === true) {
                var key_value = periods_list[period_index] + "-" + day
                if (props.raw.days[day].periods[periods_list[period_index]] === undefined) { // If the period is a free or a break
                    period_timetable.push(
                        <tr className="period_cycle_empty" key={`${props.raw.days[day].dayname}${key_value}`}>
                            {/* <td className="period_number">
                                {periods_list[period_index]}
                            </td> */}
                            <td className="period_description">
                                -
                            </td>
                        </tr>
                    )
                } else { // If the period has a class, then displays class details
                    //adds the period name to the class, allows hover events
                    
                    var period_name = props.raw.days[day].periods[periods_list[period_index]].title.split(" ")[0]
                    if (props.raw.days[day].periods[periods_list[period_index]].room === null) {
                        period_name = ""
                    }
                    let class_name = `period_cycle_description ${period_name}`
                    period_timetable.push(
                        <tr className="period_cycle_class" 
                            key={`${props.raw.days[day].dayname}${key_value}`}>
                            {/* <td className="period_cycle_number">
                                {periods_list[period_index]}
                            </td> */}
                            <td className={class_name}
                                onMouseOver = {(e) => {
                                    highlight_classes(e);
                                }}
                                onMouseLeave = {(e) =>{
                                    highlight_classes_time_out(e);
                                }}>
                                {period_name}
                            </td>
                        </tr>
                    )
                }
            }
            //console.log(periods_list[period_index])
        }
        // The list containing today's periods are pushed to the week of days
        // This requires a seperate module because we need to nest it inside a div for CSS formatting
        day_timetable.push(
            <td className="day" key={props.raw.days[day].dayname}>
                {period_timetable}
            </td>
        )
        period_timetable = []
        // The list containing the week's day is pushed to the list of weekss
        if (props.raw.days[day].dayname.slice(0, -1) === "Fri") {
            timetable.push(
                <table className="week" key={props.raw.days[day].dayname.slice(-1)}>
                    <thead>
                        <tr>
                            {period_header_table}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {day_timetable}
                        </tr>
                    </tbody>
                </table>
            )
            period_header_table = []
            day_timetable = []
        }
        day += 1
    }
    return (
        <div className="timetable_cycle" id="timetable_cycle">
            {timetable}
        </div>
    )
}