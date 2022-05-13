export default function tt_daily(props) {
    // Timetable to be stored and variable
    let timetable = []
    var bells = props.raw.bells

    for (var bell_position in bells) {
        //console.log(bell_position)
        if (props.raw.timetable.timetable.periods[bells[bell_position].period] !== undefined) { //if class
            var period_data = props.raw.timetable.timetable.periods[bells[bell_position].period]

            //Converts it from shorttitle to full title
            var period_name = period_data.title
            for (var item in props.raw.timetable.subjects) {
                if (props.raw.timetable.subjects[item].shortTitle === period_name) {
                    period_name = props.raw.timetable.subjects[item].subject
                    period_name = period_name.split(" ").slice(0, -1).join(" ") //removes the last component "YR12"
                }
            }
            var teacher = ""
            if ((period_data.fullTeacher !== undefined) && (period_data.fullTeacher !== "")) {
                teacher = "(" + period_data.fullTeacher + ")"
            }
            timetable.push(
                <tr key={bell_position} className="period_class">
                    <td>Period {bells[bell_position].period}</td>
                    <td>{period_name}<div>with {teacher}</div></td>
                </tr>
            )
            //console.log(props.raw.timetable.timetable.periods[bells[bell_position].period])
        } else { //if break
            timetable.push(
                <tr key={bell_position} className="period_break">
                    <td>{bells[bell_position].bellDisplay}</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
    }
    return (
        <table className="timetable_today" cellPadding={0} cellSpacing={0}>
            <thead>            
            </thead>
            <tbody>
                {timetable}
            </tbody>
        </table>
    )
}

/*
LOGIC, ORGANISE TIMETABLE BY BELLS
LOOP THROUGH BELLS, at the same time do periods[...bells[i].period] == undefined to check
Check for variation or teacher changes then 
Display period[...].title in array
Display array of divs
*/