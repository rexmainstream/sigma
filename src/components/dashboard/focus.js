import React from "react";
import { Add_scroll_event } from "../../res/scripts/scroll";

export default function Focus() {
    return (
        <div className="focus">
            <h1>Current Focus</h1>
            <div className="box">
                <p id="current_focus">Get better for software design</p>
                <div id="amount_of_points">50/100</div>
                <div id="progress_bar">
                    <div id="progress"></div>                       
                </div>
                <div className="buttons_container">
                    <button className="clickable_button">Edit Focus</button>
                    <button className="clickable_button">Delete Focus</button>
                </div>
                
            </div>
            <h1>Steps</h1>
            <div className="steps box"> {/*Template goalbox*/}
                <h2 className="goal_name">Comment on my subroutines</h2>
                <p className="goal_description">Internal documentation is an essential aspect in the SDD major project. I need to develop a habit of commenting after every subroutine.</p>
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", function() {
    let headings = (document.querySelector('.focus')).querySelectorAll('h1');
    let box = (document.querySelector('.focus')).querySelectorAll('.box');
    let steps = (document.querySelector('.focus')).querySelectorAll('.steps');

    //Adds scroll events to the headings
    Add_scroll_event(headings[0], function() {
        headings[0].style.animation = `fade_in_text 0.5s ease-out both`;
    }, false)
    Add_scroll_event(headings[1], function() {
        headings[1].style.animation = `fade_in_text 0.5s ease-out both`;
    }, false)

    //Adds scroll event to the boxes 
    Add_scroll_event(box[0], function() {
        box[0].style.animation = `fade_in_text 0.5s ease-out both`;
    }, false);

    //Adds an animation for each of the steps
    for (const element of steps) {
        Add_scroll_event(element, function() {
            element.style.animation = `fade_in 0.5s ease-out both`;
        }, false);
    }



})