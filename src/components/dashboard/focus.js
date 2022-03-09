import React from "react";
import { Add_scroll_event } from "../../res/scripts/scroll";

export default function Focus() {
    return (
        <div className="focus">
            <h1>Current Focus</h1>
            <div className="goals box">
                <p>Get better for software design</p>
            </div>
        </div>
    );
}

function Show_focus() {
    let the_focus = document.querySelector('.focus')

    the_focus.style.animation = `fade_in 0.5s ease-out both`
    //the_focus.style.opacity = ``;
    console.log('Focus is shown');
}


document.addEventListener("DOMContentLoaded", function() {
    let the_focus = document.querySelector('.focus')
    Add_scroll_event(the_focus, function() {
        Show_focus();
    }, false)
})