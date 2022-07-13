import React from "react";

export default function Print_event_item(props) {
    const title = props.event_title;
    const due_date = props.due_date;
    const priority = props.priority
    return (
        <div
            className="print_event"
        >
            <div className="print_event_checkbox">
                <div className="check_box">

                </div>
            </div>
            <div className="print_event_title">
                { title }
            </div>
            <div className="print_event_priority">
                { priority }
            </div>
        </div>
    )
}