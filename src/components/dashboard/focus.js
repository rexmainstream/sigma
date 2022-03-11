import React from "react";
import { Add_scroll_event } from "../../res/scripts/scroll";
import Goal_step from "./step";

export default function Focus() {
    return (
        <div className="focus">
            <h1>Current Focus</h1>
            <div className="box">
                <p id="current_focus">Get better for software design</p>
                <div id="progress_bar"
                    onMouseOver = {function (){console.log("hello")}}>
                    <div id="progress"></div>                       
                </div>
                <div className="buttons_container">
                    <button className="clickable_button"
                            aria-label="edit focus"
                            title="Edit the focus">Edit Focus</button>
                    <button className="clickable_button delete_button" 
                            aria-label="delete focus"
                            title="Delete the focus">Delete Focus</button>
                </div>
                
            </div>
            {/*<h2>Steps</h2>*/}
            <div id="steps_container">
                <Goal_step />
            </div>
        </div>
    );
}

//Initialises the focus box
export function initialise_focus() {
    let headings = (document.querySelector('.focus')).querySelector('h1');
    let box = (document.querySelector('.focus')).querySelectorAll('.box');
    let steps = (document.querySelector('.focus')).querySelectorAll('.steps');

    //Adds scroll events to the headings
    Add_scroll_event(headings, function() {
        headings.style.animation = `fade_in_text 0.5s ease-out both`;
    }, false, 200)
    //Adds scroll event to the boxes 
    Add_scroll_event(box[0], function() {
        box[0].style.animation = `fade_in_text 0.5s ease-out both`;
    }, false, 100);

    //Adds an animation for each of the steps
    for (const element of steps) {
        Add_scroll_event(element, function() {
            element.style.animation = `fade_in 0.5s ease-out both`;
        }, false, 100);
    }



}