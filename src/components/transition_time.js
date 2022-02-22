import React from "react";

const line_height = 40;
let line_width = 150

if (window.screen.width < 1000) {
    line_width = 250
}

export default function Transition_time() {
    return (
        <div>
            <p id="next_period">Transition</p>
            <p>in</p>
            <p>
                <svg width={line_width} height={line_height}>
                    <line className="left-to-right line" x1="0" y1= {line_height/2} x2={line_width} y2={line_height/2} stroke="rgb(29 98 149)" strokeWidth={1.5}></line>
                </svg>
                <b id="time_until_transition">5:01</b>
                <svg width={line_width} height={line_height}>
                    <line className="right-to-left line" x1={line_width} y1={line_height/2} x2={0} y2={line_height/2} stroke="rgb(29 98 149)" strokeWidth={1.5}></line>
                </svg>
            </p>
        </div>
    );
}

