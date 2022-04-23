import React from "react";
import { select_all_input } from "../../res/scripts/add_event";
import { create_modal, exit_modal } from "../../res/scripts/add_modal";
import { string_validation } from "../../res/scripts/data_validation";
import { Add_scroll_event } from "../../res/scripts/scroll";
import Goal_step from "./step";

export default function Focus() {
    return (
        <div className="focus">
            <h1>Current Focus</h1>
            <div className="box">
                <div id="current_focus"></div>
                <hr></hr>
                <div id="progress_bar">
                    <div id="progress"></div>                       
                </div>
                <div className="buttons_container">
                    <button className="clickable_button"
                            aria-label="edit focus"
                            title="Edit Focus"
                            onClick={() => {create_focus()}}>Edit</button>
                    <button className="clickable_button delete_button" 
                            aria-label="delete focus"
                            title="Delete Focus">Delete</button>
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
    const headings = (document.querySelector('.focus')).querySelector('h1');
    const box = (document.querySelector('.focus')).querySelectorAll('.box');
    const steps = (document.querySelector('.focus')).querySelectorAll('.steps');
    const progress_bar = document.querySelector('#progress');
     //Adds scroll events to the headings
     Add_scroll_event(headings, function() {
        headings.style.animation = `fade_in_text 0.5s ease-out both`;
    }, false, 200)
    Add_scroll_event(box[0], function() {
        box[0].style.animation = `fade_in_text 0.5s ease-out both`;
    }, false, 100);

    //Adds an animation for each of the steps
    for (const element of steps) {
        Add_scroll_event(element, function() {
            element.classList.add('show_step');
        }, false, 100);
    }

    Add_scroll_event(progress_bar, function() {
        progress_bar.classList.add('show_progress');
    }, false, 100)

    check_focus();
}

export function check_focus() {
    const focus = document.querySelector('#current_focus');
    const button = focus.parentNode.querySelector('.clickable_button')
    //CHange this later to checking database
    if (focus.innerHTML === '') {
        button.innerHTML = 'Create';
        button.ariaLabel = 'create focus';
        button.title = 'Create Focus';
        focus.innerHTML = 'You currently have no focus.';
        focus.classList.add('focus_tutorial');
    } else {
        button.innerHTML = 'Edit';
        button.ariaLabel = 'edit focus';
        button.title = 'Edit Focus';
        button.classList.add('span');
    }
}

function create_focus() {
    const form = document.createElement('div');
    const center = document.createElement('div');
    const title = document.createElement('input');
    const create_button = document.createElement('button');
    const button_container = document.createElement('div');

    let modal_width = '50vw';
    if (window.screen.width < 1000) {     
        modal_width = `90vw`;
    }


    title.setAttribute('required', 'required');
    title.setAttribute('placeholder', 'Focus Title');

    form.id = 'focus_form';
    title.classList.add('focus_title');
    create_button.classList.add('clickable_button');
    center.classList.add('center_vertical');
    button_container.classList.add('center_vertical');

    if (document.querySelectorAll('.clickable_button[title="Create Focus"]').length !== 0) {
        create_button.textContent = 'Create Focus';
    } else {
        create_button.textContent = 'Edit Focus';
        title.value = document.querySelector('#current_focus').innerHTML;
    }

    button_container.append(create_button);
    center.append(title);
    form.append(center, button_container);

    create_modal(modal_width, true, form, true);
    title.focus();

    create_button.addEventListener('click', (e) => {
        const current_focus = document.querySelector('#current_focus');
        if (string_validation(title.value, 2, 50, 'focus') === true) {
            current_focus.innerHTML = title.value;

            current_focus.classList.remove('focus_tutorial');
            current_focus.classList.add('new_focus');
            current_focus.addEventListener('animationend', function handler() {
                current_focus.classList.remove('new_focus');
                current_focus.removeEventListener('animationend', handler);
            })

            check_focus();
            exit_modal(e);
        }
    });
    


    title.addEventListener('dblclick', (e) => {select_all_input(e)});
}