import React from "react";

const line_height = 40;
let line_width = 150;
let stroke_width = 1.5;

if (window.screen.width < 1000) {
    line_width = 250;
    stroke_width = 2.5;
}

export default function Transition_time() {
    return (
        <div>
            <p id="next_period">Transition</p>
            <p>in</p>
            <div className="center_vertical">
                <svg width={line_width} height={line_height}>
                    <line className="left-to-right line" x1={0} y1= {line_height/2} x2={3/4 * line_width} y2={line_height/2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
                </svg>
                <div id="time_until_transition">5:01</div>
                <svg width={line_width} height={line_height}>
                    <line className="right-to-left line" x1={line_width} y1={line_height/2} x2={line_width/4} y2={line_height/2} stroke="rgb(29 98 149)" strokeWidth={stroke_width}></line>
                </svg>
            </div>
        </div>
    );
}

