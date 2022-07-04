import React from 'react';
import { custom_alert } from '../../res/scripts/add_alert';
import { exit_modal } from '../../res/scripts/add_modal';
import add_inline_animation from '../../res/scripts/animation_timing';
import { string_validation } from '../../res/scripts/data_validation';
import { Add_new_step, render_steps, return_steps_list } from './focus';
import { render_progress } from './progress';
import Redo_complete_button from './step_redo_complete_button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


export default function Goal_step(props) {
    const goal_name = props.goal_name;
    const goal_description = props.goal_desc;
    const order = props.order;
    const step_type = props.step_type;
    const step_list = return_steps_list();

    let step_class = `steps box`;


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

        if (goal_description !== "This step has no description.") {
            description.value = goal_description;
        }
        
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
        const button = step.parentNode.parentNode.querySelector('.clickable_button[title="Add new Step"]');

        custom_alert('Are you sure you want to remove this step?', "warning_yes_no","Are you sure you want to remove this step, you cannot undo this action.", function() {
            step_list[order - 1].step_type = "delete";
            //step.parentNode.querySelector('.clickable_button').classList.add("")
            render_steps();

            step.addEventListener("animationend", function handler() {
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
                change_step_value(order, 'delete', false, false, false);

                render_steps();
                render_progress();
                if (button.classList.contains('move_up')) {
                    button.classList.replace('move_up', "move_up2")
                } else if(button.classList.contains('move_up2')) {
                    button.classList.replace("move_up2", "move_up")
                } else {
                    button.classList.add('move_up');
                }


                step.removeEventListener('animationend', handler);
            })
        } );

    }
    //This function is run when the user completes their step
    function complete_step(e) {
        const step = e.target.parentNode.parentNode.parentNode;
        //console.log('Complete step function has run');

        //Play animation
        step.style.animation = `fade_out 0.3s ease-out`;
        add_inline_animation(step, "fade_out", "0.3s", "ease-out", "", "", () => {
            step_list[order - 1].completed = true;
            change_step_value( order, true, false, false, false);
            
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
            change_step_value(order, false, false, false, false);
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
                        <i className='fa fa-edit'></i>
                </button>
                <button 
                    className='icon_button'
                    aria-label='remove step'
                    title='Remove Step'
                    onClick={(e) => {remove_step(e)}}
                    >&times;
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
export function change_step_value(current_order, completed, new_title, new_description, new_order) {
    let db
    let transaction
    let object_store
    let current_steps
    let current_step
    let next_events
    let my_index
    let new_step = {
        step_title: new_title,
        step_desc: new_description,
        completed: completed,
        order: current_order
    }

    //Gets db length
    let database_length;
    const open_request = window.indexedDB.open('student_file', 14);
    open_request.addEventListener('error', () => {
        //Error prompt
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    });

    open_request.addEventListener('success', () => {
        db = open_request.result;
        transaction = db.transaction(['steps_list'], 'readwrite');
        object_store = transaction.objectStore('steps_list');

        //Gets current steps from db
        object_store.openCursor().addEventListener('success', (e) => {
            current_steps = e.target.result;
            my_index = object_store.index('order');

            current_step = my_index.get(current_order);
            current_step.addEventListener('success', () => {

                //conditional changes
                if (completed === 'delete') {
                    object_store.delete(current_order);
                    database_length = object_store.count()        
                    database_length.addEventListener('success', () => {  
                        //Shift order of subsequent events up by one
                        for (let i = (current_order + 1); i <= database_length.result + 1; i++) {
                            change_step_value(i, null, false, false, (i - 1));
                        }
                    })
                } else {
                    if (new_title === false) {
                        new_step.step_title = current_step.result.step_title;
                    }
                    if (new_description === false) {
                        new_step.step_desc = current_step.result.step_desc;
                    }
                    if (new_order !== false) {
                        new_step.order = new_order;
                    }
                    if (completed === null) {
                        new_step.completed = current_step.result.completed;
                    }
                    object_store.put(new_step, current_order);                    
                }
            })
        });
    })

    open_request.addEventListener('error', () => {
        custom_alert('Failed to open database', "error", "Failed to open database")

    })
}