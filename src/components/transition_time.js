import React from "react";


export default function Transition_time() {
    return (
        <div>
            <p id="next_period">Transition</p>
            <p>in</p>
            <p>
                <svg width={100} height={40}>
                    <line className="left-to-right line" x1="20" y1="20" x2="80" y2="20" stroke="rgb(29 98 149)" strokeWidth={1.5}></line>
                </svg>
                <b id="time_until_transition">5:01</b>
                <svg width={100} height={40}>
                    <line className="right-to-left line" x1="80" y1="20" x2="20" y2="20" stroke="rgb(29 98 149)" strokeWidth={1.5}></line>
                </svg>
            </p>
        </div>
    );
}