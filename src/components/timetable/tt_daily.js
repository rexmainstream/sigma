export default function tt_daily(props) {
    // Timetable to be stored and variable
    let timetable = []
    var bells = props.raw.bells

    //required to check for room to teacher variationA
    for (var bell_position in bells) {
        //console.log(bell_position)
        if (props.raw.timetable.timetable.periods[bells[bell_position].period] !== undefined) { //if class
            var period_data = props.raw.timetable.timetable.periods[bells[bell_position].period]

            //Converts it from shorttitle to full title
            var period_name = period_data.title
            var period_room = period_data.room
            for (var item in props.raw.timetable.subjects) {
                if (props.raw.timetable.subjects[item].shortTitle === period_name) {
                    period_name = props.raw.timetable.subjects[item].subject
                    period_name = period_name.split(" ").slice(0, -1).join(" ") //removes the last component "YR12"
                }
            }
            var teacher = ""
            if ((period_data.fullTeacher !== undefined) && (period_data.fullTeacher !== "")) {
                teacher = "with " + period_data.fullTeacher + ""
                timetable.push(
                    <tr key={bell_position} className="period_class">
                        <td className="period_name">{period_name}<div className="period_teacher">{teacher}</div></td>
                        <td className="period_room">{period_room}</td>
                    </tr>
                )
            } else {
                period_room = bells[bell_position].startTime
                timetable.push(
                    <tr key={bell_position} className="period_break">
                        <td>{period_name}</td>
                        <td>{period_room}</td>
                    </tr>
                )
            }
            
            //console.log(props.raw.timetable.timetable.periods[bells[bell_position].period])
        } else { //if break
            if (bells[bell_position].bellDisplay.split(" ")[0] === "Period") {
                timetable.push(
                    <tr key={bell_position} className="period_free">
                        <td className="period_name">{bells[bell_position].bellDisplay}</td>
                        <td className="period_room">{bells[bell_position].startTime}</td>
                    </tr>
                )
            } else {
                timetable.push(
                    <tr key={bell_position} className="period_break">
                        <td>{bells[bell_position].bellDisplay}</td>
                        <td>{bells[bell_position].startTime}</td>
                    </tr>
                )
            }

        }
    }
    return (
        <table className="timetable_today" cellPadding={0} cellSpacing={0}>
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