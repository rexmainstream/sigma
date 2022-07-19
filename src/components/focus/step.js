import React from 'react';
import { custom_alert } from '../../res/scripts/add_alert';
import { exit_modal } from '../../res/scripts/add_modal';
import add_inline_animation from '../../res/scripts/animation_timing';
import { string_validation } from '../../res/scripts/data_validation';
import { Add_new_step, render_steps, return_steps_list } from './focus';
import { render_progress } from './progress';
import Redo_complete_button from './step_redo_complete_button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


export default function Goal_step(props) {
    const goal_name = props.goal_name;
    let desc = props.goal_desc;
    let goal_description = desc;
    const order = props.order;
    const step_type = props.step_type;
    const step_list = return_steps_list();

    let step_class = `steps box`;


    if (goal_description.replace(/\r?\n|\r/g, "") === '' || goal_description.replace(/\s+/g, '') === '') {
        goal_description = "This step has no description.";
    }

    switch (step_type) {
        case "new":
            step_class = 'steps box move_up';
            break;
        case "delete":
            step_class = "steps box remove_step";
            break;
        case "show":
            step_class += "";
            break;
        case "edit":
            step_class = "steps box move_up2"
            break;
    }

    function show_description(e) {
        const description = e.currentTarget.parentNode.parentNode.querySelector('.goal_description')
        if (description.classList.contains('hide_description')) {
            description.classList.replace("hide_description", "show_description");
            e.currentTarget.setAttribute('title', 'Hide Description');
        } else {
            description.classList.replace("show_description", "hide_description");
            e.currentTarget.setAttribute('title', 'Show Description');
        }
        
    }

    //This function runs when the user presses the edit button allows the user to cahnge the values
    function edit_step(e) {
        let form
        let title;
        let description;
        let create_btn
        let edit_btn
        let steps_list = return_steps_list()

        //Event creation form
        Add_new_step();

        //Changes some elements
        form = document.querySelector('#step_form');
        title = form.querySelector('.step_title');
        description = form.querySelector('textarea');
        create_btn = form.querySelector('.clickable_button')
        edit_btn = create_btn.cloneNode()

        edit_btn.innerHTML = "Edit Step";
        edit_btn.ariaLabel = 'edit step';
        edit_btn.title = 'Edit this Step';
        title.value = goal_name;
        description.value = desc;
        
        //Remove event listeners on the previous edit button
        create_btn.replaceWith(edit_btn);

        //Adds new event listener that changes the specific index
        edit_btn.addEventListener('click', (evt) => {
            if (string_validation(title.value, 2, 50, 'step title')) {
                const step = e.target.parentNode.parentNode.parentNode;
                exit_modal(evt);
                steps_list[order - 1].goal_name = title.value;
                steps_list[order - 1].goal_desc = description.value;
                change_step_value(order, null, title.value, description.value, false);

                if (steps_list[order - 1].step_type === 'edit') {
                    steps_list[order - 1].step_type = 'new';
                } else {
                    steps_list[order - 1].step_type = 'edit';
                }

                //Renders new steps list
                render_steps();
            }
        })
    }

    //This function removes the step
    function remove_step(e) {
        //console.log('Remove step function has run');
        const completed = step_list[order - 1].completed;
        const step = e.target.parentNode.parentNode.parentNode;
        custom_alert('Are you sure you want to remove this step?', "warning_yes_no","Are you sure you want to remove this step, you cannot undo this action.", function() {

            add_inline_animation(step, 'delete_step 0.5s ease-in', function() {
                step_list.splice(order - 1, 1);

                for (let i = order - 1; i <= step_list.length - 1; i++) {
                    if (completed === true && step_list[i].completed === true) {
                        step_list[i].step_type = "edit";
                    } else if(completed === false){
                        step_list[i].step_type = "edit";
                    }
                    step_list[i].order -= 1;
                }

                //delete step from database
                change_step_value(order, 'delete', false, false);

                render_steps();
                render_progress();
            })
        } );

    }
    //This function is run when the user completes their step
    function complete_step(e) {
        const step = e.target.parentNode.parentNode.parentNode;
        //console.log('Complete step function has run');

        //Play animation
        step.style.animation = `fade_out 0.3s ease-out`;
        add_inline_animation(step, "fade_out 0.3s ease-out", () => {
            step_list[order - 1].completed = true;
            change_step_value( order, true, false, false);
            
            render_steps();
            render_progress();
        })

        //Render steps first and then plays the second animation
        render_steps();
    }
    
    //Function runs when user presses redo button
    function redo_step(e) {
        const step = e.target.parentNode.parentNode.parentNode;
        step.style.animation = `fade_out 0.3s ease-out`;
        render_steps();

        step.addEventListener('animationend', function handler() {
            step.style.animation = ``
            step_list[order - 1].completed = false;
            change_step_value(order, false, false, false);
            render_steps();
            render_progress()
            step.removeEventListener('animationend', handler)
        });

    }

    return (
    <div 
        className={step_class}
        onAnimationEnd={(e) => {
            e.target.classList.remove('move_up', "move_up2");
        }}> {/*Template goalbox*/}
        <div className='step_top_line'>
            <h2 className="goal_name"><span className='goal_order'>{order}</span>{goal_name}</h2>
            <span className='button_container'>
                <button 
                    className='icon_button'
                    aria-label='edit step'
                    title='Edit Step'
                    onClick={(e) => {
                        edit_step(e)
                    }                     
                        }>
                        <FontAwesomeIcon icon = { faEdit } />
                </button>
                <button 
                    className='icon_button'
                    aria-label='remove step'
                    title='Remove Step'
                    onClick={(e) => {remove_step(e)}}
                    >
                        <FontAwesomeIcon icon = {faTimes} />
                </button>

            <Redo_complete_button 
                redo={step_list[order - 1].completed}
                complete_function = {(e) => {complete_step(e)}}
                redo_function = {(e) => {redo_step(e)}}
            />
            </span>
        </div>
        <hr></hr>
        <p className="goal_description hide_description">{goal_description}</p>
        <div className='button_container'><button title = 'Show Description' className='description_button' onClick={(e) => show_description(e)}> <FontAwesomeIcon icon = {faChevronDown} /></button></div>
    </div>
    
    );
}

//This function changes the steps value in the indexedDB database. 
//Input false to not change a value (null for completed)
export function change_step_value(current_order, completed, new_title, new_description) {
    let new_step = {
        step_title: new_title,
        step_desc: new_description,
        completed: completed,
        order: current_order
    }

    //Gets db length
    const open_request = window.indexedDB.open('student_file', 15);
    open_request.addEventListener('error', () => {
        //Error prompt
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    });

    open_request.addEventListener('success', () => {
        console.log(new_step)
        const db = open_request.result
        const stored_events = db.transaction(['steps_list'], 'readwrite').objectStore('steps_list');
        console.log(new_step)
        if (completed === 'delete') {
            const get_datatabase_length = stored_events.count();
            get_datatabase_length.addEventListener('success', () => {
                const length = get_datatabase_length.result;

                for (let i = current_order + 1; i <= length; i++) {
                    console.log(i)
                    const get_event = stored_events.get(i);
                    get_event.addEventListener('success', () => {
                        const the_event = get_event.result;
                        the_event.order = the_event.order - 1;

                        stored_events.put(the_event, i - 1)
                    })

                } 

                stored_events.delete(length)

            })
            
        } else {
            const get_event = stored_events.get(current_order);

            get_event.addEventListener('success', () => {
                const curr_event = get_event.result;

                if (new_title === false) {
                    new_step.step_title = curr_event.step_title;
                }

                if (new_description === false) {
                    new_step.step_desc = curr_event.step_desc;
                }
                stored_events.put(new_step, current_order)
            })
        }
    });

    open_request.addEventListener('error', () => {
        custom_alert('Failed to open database', "error", "Failed to open database")

    })
}