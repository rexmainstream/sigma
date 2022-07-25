// Alex

// Imports
import React from "react";
import ReactDom from "react-dom";
import { custom_alert } from "../../res/scripts/add_alert";
import { select_all_input } from "../../res/scripts/add_event";
import { create_modal, exit_modal } from "../../res/scripts/add_modal";
import { string_validation } from "../../res/scripts/data_validation";
import random_number from "../../res/scripts/random_num_gen";
import Goal_step from "./step";
import Progress_bar, { render_progress } from "./progress";
import img from "../../res/images/tutorial_1.png";
import img2 from "../../res/images/tutorial_2.png";
import img3 from "../../res/images/tutorial_3.png";
import add_inline_animation from "../../res/scripts/animation_timing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";

let steps_list = [];
let db;
let stored_focus
let focus_from_database
let count = true;
//Gets current focus


function step(title, description, index, completed, step_type) {
    this.goal_name = title;
    this.goal_desc = description;
    this.order = index + 1;
    this.completed = completed;
    this.step_type = step_type;
}

export function step2(title, description, index, completed) {
    this.step_title = title;
    this.step_desc = description;
    this.order = index + 1;
    this.completed = completed;
}
export default class Focus extends React.Component {
    componentDidMount() {
        initialise_focus();
        check_focus();
    }
    render() {
        //Help prompt. User presses blue question button for directions
        function focus_help() {
            let modal_width = '85vw';
            const modal_content = document.createElement('div');
            const title = document.createElement('h1');
            const line = document.createElement('hr');
            const help_text1 = document.createElement('p');
            const help_text2 = document.createElement('p');
            const help_text3 = document.createElement('p');
            const image1 = document.createElement('img');
            const image2 = document.createElement('img');
            const image3 = document.createElement('img');
    
    
            image1.src = img;
            image1.alt = "Create button";
            image2.src = img2;
            image2.alt = "Create step form";
            image3.src = img3;
            image3.alt = "A step for your goal."
    
            title.textContent = "Focus Tutorial";
            help_text1.textContent = "Your focus is where you set long term goals or objectives such as 'Getting a higher rank' or 'Becoming a Prefect.' Start by clicking the create button below.";
            help_text2.textContent = "Setting a goal is not enough. To achieve your goals, you need to set some steps. Press the 'ADD STEP +' button and on the form enter the details of step which you need to complete to progress on you goal. On the form, press the 'ADD STEP' button to add your first step.";
            help_text3.textContent = "You can have up to 20 steps for your focus. Pressing the triangle will reveal the description. Hovering over the step allows you to edit, complete or delete the step. When you have completed a step, press the complete button on the step and it will increase progress towards your goal.";
            modal_content.id = "focus_help";
    
    
    
            modal_content.append(title, line, help_text1, image1, help_text2, image2, help_text3, image3);
    
    
            if (window.screen.width < 1000) {
                modal_width = "95vw";
            }
            create_modal(modal_width, true, modal_content, true, true);
        }
    
        return(
            <div className="focus">
                <h1>Current Focus</h1>
                <div className="box" id="focus_container">
                    <div className="focus_buttons_container">
                        <button className="help_button icon_button"
                            aria-label="focus help"
                            title="Help"
                            onClick={() => {
                                focus_help()
                            }}
                            >
                            <FontAwesomeIcon icon={faQuestion}/>
                        </button>
                    </div>
                    <div id="current_focus"></div>
                    <hr></hr>
                    <div className="progress_bar">
                        <Progress_bar />
                    </div>
                    <div className="buttons_container">
                        <button className="clickable_button"
                                aria-label="edit focus"
                                title="Edit Focus"
                                onClick={() => {create_focus()}}>Edit
                        </button>
                    </div>
                    
                </div>
                {/*<h2>Steps</h2>*/}
                <hr></hr>
                <div id="steps_container"></div>
                <div id="completed_steps_container"></div>
                <div 
                    id="focus_function_container"
                >
                    <div className="icon_button_container_large">
                        <button 
                            className="icon_button"
                            aria-label="add step to focus"
                            title="Add new Step"
                            onClick={() => {Add_new_step()}}>
                            <FontAwesomeIcon icon = {faPlus}/>
                        </button>
                        <button
                            className="icon_button"
                            aria-label="move to top button"
                            title="Move to Top"
                            onClick={
                                () => {
                                    window.scrollTo(0, 0);
                                }
                            }
                        >
                            <FontAwesomeIcon icon = {faArrowUp}/>
                        </button>
                    </div>

                </div>


            </div>
        )
    }
}

export function Add_new_step() {
    const content = document.createElement('div');
    const title = document.createElement('input');
    const description_input = document.createElement('textarea');
    const button_container = document.createElement('div');
    const create_button = document.createElement('button');
    let width = '75vw';

    if (steps_list.length < 20) {
        if (document.querySelector('#current_focus').classList.contains('focus_tutorial') === false) {
            title.placeholder = 'Step title';
            title.setAttribute('required', 'required');
            title.setAttribute('type', 'text');
            title.classList.add('step_title');
            description_input.setAttribute('type', 'text');
            description_input.placeholder = `Description: Max 2000 characters`;
            description_input.maxLength = 2000;
            create_button.innerHTML = 'Add Step';
            create_button.classList.add('clickable_button');
            create_button.ariaLabel = 'create new step';
            create_button.title = 'Create Step';

            content.id = 'step_form';

            if (window.screen.width < 1000) {
                width = '90vw';
            }


            button_container.append(create_button);
            content.append(title, description_input, button_container)
            create_modal(width, true, content, true, true);
            title.focus();
            title.addEventListener('dblclick', (e) => {select_all_input(e)});
            description_input.addEventListener('dblclick', (e) => {select_all_input(e)});

            create_button.addEventListener('click', (e) => {
                let step_desc = description_input.value;
                const transaction = db.transaction(['steps_list'], 'readwrite');

                if (string_validation(title.value, 2, 50, 'title') && string_validation(description_input.value, 0, 2000, 'step description')) {
                    const stored_steps = transaction.objectStore('steps_list');
                    const new_step = { step_title: title.value, step_desc: step_desc, completed: false, order: steps_list.length + 1};
                    stored_steps.add(new_step, steps_list.length + 1);
                    steps_list.push(new step(title.value, step_desc, steps_list.length, false, "new"));
                    render_steps();
                    exit_modal(e);
                    render_progress();

                    if (document.querySelectorAll('.move_up').length >= 1) {
                        document.querySelector('.move_up').addEventListener('animationend', function handler(e) {
                            e.target.classList.remove('move_up');
                            e.target.removeEventListener('animationend', handler);
                        })
                    }
                }
            })
        } else {
            custom_alert('You have no current focus', 'warning', 'Please create a focus first before adding steps.', false)
        }

    } else {
        custom_alert('Max steps reached', "warning", 'You have reached the maximum amount of steps of 20. Please remove some before you add any more steps.')
    }
}

//This function renders the steps
export function render_steps() {
    const container = document.querySelector('#steps_container');
    const completed_container = document.querySelector("#completed_steps_container")
    const current_steps = [];
    const completed_steps = [];
    const title = 
        (<h3>Completed</h3>);

    
    //Renders the steps_list onto the DOM
    for (const step of steps_list) {
        if (step.completed === true) {
            completed_steps.push(<Goal_step goal_name={step.goal_name} goal_desc = {step.goal_desc} order = {step.order} key = {step.order} step_type= {step.step_type} />)
        } else {
            current_steps.push(<Goal_step goal_name={step.goal_name} goal_desc = {step.goal_desc} order = {step.order} key = {step.order} step_type= {step.step_type} />)
        }
    }

    //If no steps then removes the completed steps title
    if (completed_steps.length > 0) {
        completed_steps.unshift(title);
    }

    //Renders the steps both in the completed and current containers
    ReactDom.render(current_steps, container);
    ReactDom.render(completed_steps, completed_container);
}

//Initialises the focus box
export function initialise_focus() {
    const focus = document.querySelector('.focus');

    //Scroll to top of screen
    window.scrollTo(0, 0);
    
    //Opens Database
    const open_request = window.indexedDB.open('student_file', 15);
    open_request.addEventListener('error', () => {
        custom_alert("Failed to load database", 'error', "Failed to load database.", false);
    });

    open_request.addEventListener('success', () => {
        db = open_request.result;
        stored_focus = db.transaction(['current_focus']).objectStore('current_focus');
        stored_focus.openCursor().addEventListener('success', (e) => {
        focus_from_database = e.target.result;

        //Adds the steps from the db to the local database
        //Can only execute once when component is mounted that is why there is a count
        if (count === true) {
            initialise_steps();
            count = false;
        } else {
            render_steps();
            render_progress();
        }


        //Adds focus from db
        if (focus_from_database !== null) {
            focus.querySelector('#current_focus').textContent = focus_from_database.value.user_focus;   
        }

        check_focus();
    })
    })

    //If there is a an upgrade needed for the db
    open_request.addEventListener('upgradeneeded', e => {
    })

     //Adds scroll events to the headings
}

//Initialisises steps by adding steps from db to local record
function initialise_steps() {
    //creates a transaction with db
    const transaction = db.transaction(['steps_list'], 'readwrite');
    const object_store = transaction.objectStore('steps_list')

    //Opens object store and then takes the values and adds it to the local record
    //Local record is needed to control animations
    object_store.openCursor().addEventListener('success', (evt) => {
        const cursor = evt.target.result;

        if (cursor) {
            steps_list.push(new step(cursor.value.step_title, cursor.value.step_desc, cursor.value.order - 1, cursor.value.completed, 'new'))
            //Iterates for next item
            cursor.continue();
        } else {
            //When all of database's steps are pushed to local array.
            render_steps();
            render_progress();            
        }
    })


}

//Checks the current state of the focus and then adds animations and appends elements
export function check_focus() {
    const focus = document.querySelector('#current_focus');
    const button = focus.parentNode.querySelector('.clickable_button')
    const delete_button = document.createElement('button');
    const progress = document.querySelector(".progress").style.width;

    //Checks if focus from db is null
    if (focus_from_database === null) {
        button.innerHTML = 'Create';
        button.ariaLabel = 'create focus';
        button.title = 'Create Focus';
        focus.innerHTML = 'You currently have no focus.';
        focus.classList.add('focus_tutorial');
    } else if(progress === '100%') {
        delete_button.innerHTML = "Complete";
        delete_button.ariaLabel = "complete focus";
        delete_button.title = "Complete Focus";
        delete_button.classList.add('clickable_button', "delete_button", "span");

        if (document.querySelectorAll('button[title="Delete Focus"]').length === 1) {
            button.parentElement.replaceChild(delete_button, focus.parentNode.querySelector('button[title="Delete Focus"]'));

            delete_button.addEventListener('click', (e) => {
                focus.innerHTML = '';
                e.target.classList.add('fade_out');


                for (let i = 0; i <= steps_list.length - 1; i++) {
                    steps_list[i].step_type = 'delete';
                }
                render_steps();
                e.target.addEventListener('animationend', (e) => {
                    for (let i = 0; i <= steps_list.length - 1; i++) {
                        steps_list.splice(i);
                    }
                    remove_all_from_db()
                    render_steps();
                    render_progress();
                    focus_from_database = null;
                    check_focus();
                    let complete_button = document.querySelector('button[title="Delete Focus"]')
                    complete_button.parentNode.removeChild(complete_button);
                })
                
            })
        }
    } else {
        button.innerHTML = 'Edit';
        button.ariaLabel = 'edit focus';
        button.title = 'Edit Focus';
        button.classList.add('span');
        focus.classList.remove('focus_tutorial');
        focus.classList.add('new_focus');
        if (button.parentNode.querySelectorAll('.delete_button').length === 0) {
            delete_button.classList.add('span', 'clickable_button', "delete_button");
            delete_button.ariaLabel = 'delete focus';
            delete_button.title = 'Delete Focus';
            delete_button.innerHTML = 'Delete';

            button.parentNode.append(delete_button);
        } else if (document.querySelectorAll("button[title='Complete Focus']").length > 0) {
            delete_button.classList.add('span', 'clickable_button', "delete_button");
            delete_button.ariaLabel = 'delete focus';
            delete_button.title = 'Delete Focus';
            delete_button.innerHTML = 'Delete';
            button.parentElement.replaceChild(delete_button, focus.parentNode.querySelector('button[title="Complete Focus"]'))
        }

        delete_button.addEventListener('click', function (e) {
            custom_alert('Delete Focus?', "warning_yes_no", `Deleting the focus will remove all current steps. Continue?`,
            function() {
                focus.innerHTML = '';
                e.target.classList.add('fade_out');

    
                for (let i = 0; i <= steps_list.length - 1; i++) {
                    steps_list[i].step_type = 'delete';
                }
                render_steps();
                e.target.addEventListener('animationend', (e) => {
                    for (let i = 0; i <= steps_list.length - 1; i++) {
                        steps_list.splice(i);
                    }
                    remove_all_from_db()
                    render_steps();
                    render_progress();
                    focus_from_database = null;
                    check_focus();
                    e.target.parentNode.removeChild(e.target);
                })
            }                  
            );

        })
    }
}

function create_focus() {
    const form = document.createElement('div');
    const center = document.createElement('div');
    const title = document.createElement('input');
    const create_button = document.createElement('button');
    const button_container = document.createElement('div');
    const recommend_button = document.createElement('button');

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
    recommend_button.innerHTML = 'Recommend';
    recommend_button.classList.add('clickable_button');
    recommend_button.ariaLabel = "recommend a focus";
    recommend_button.title = 'Recommended Focuses';


    if (document.querySelectorAll('.clickable_button[title="Create Focus"]').length !== 0) {
        create_button.textContent = 'Create Focus';
    } else {
        create_button.textContent = 'Edit Focus';
        title.value = document.querySelector('#current_focus').innerHTML;
    }

    button_container.append(create_button, recommend_button);
    center.append(title);
    form.append(center, button_container);

    create_modal(modal_width, true, form, true);
    title.focus();

    create_button.addEventListener('click', (e) => {
        const current_focus = document.querySelector('#current_focus');
        const transaction = db.transaction(['current_focus'], 'readwrite');
        const user_focus = transaction.objectStore('current_focus');
        const new_focus = { user_focus: title.value }
        if (string_validation(title.value, 2, 50, 'focus') === true) {
            current_focus.innerHTML = title.value;
            focus_from_database = title.value;
            current_focus.classList.remove('focus_tutorial');
            const add_request = user_focus.put(new_focus, 1);
            check_focus()
            add_request.addEventListener('success', () => {
                add_inline_animation(current_focus, 'reveal_new_focus 2s ease-in-out', function() {
                })
            })
            exit_modal(e);
        }
    });   

    recommend_button.addEventListener('click', () => {
        const recommended_focus = random_number(1, 26);

        switch (recommended_focus) {
            case 1:
                title.value = 'Achieve merit list in upcoming examinations.';
                break;
            case 2:
                title.value = 'Learn a new skill or hobby.';
                break;
            case 3: 
                title.value = 'Save up some money.';
                break;
            case 4:
                title.value = 'Become more organised';
                break;
            case 5:
                title.value = 'Pursue a healthy lifestyle.';
                break;
            case 6:
                title.value = "Improve in English essay writing.";
                break;
            case 7:
                title.value = "Get a girlfriend.";
                break;
            case 8:
                title.value = 'Stop getting into trouble at school.';
                break;
            case 9:
                title.value = 'Advance to a better team in GPS sports.';
                break;
            case 10:
                title.value = 'Improve performance and productivity.';
                break;
            case 11:
                title.value = 'Get a 99+ ATAR.';
                break;
            case 12:
                title.value = 'Find an effective study system.';
                break;
            case 13:
                title.value = "Actively involve in Award Scheme points.";
                break;
            case 14:
                title.value = "Be nominated into the Sydney Boys SRC.";
                break;
            case 15:
                title.value = "Earn a leadership position. e.g. Team captain";
                break;
            case 16:
                title.value = "Achieve a 97% attendance rate.";
                break;
            case 17:
                title.value = "Figure out what you want to do for a career.";
                break;
            case 18:
                title.value = "Make some new friends.";
                break;
            case 19:
                title.value = "Get hired for a part time job.";
                break;
            case 20:
                title.value = "Join extracuricular activities.";
                break;
            case 21:
                title.value = "Get top in you class for Maths";
                break;
            case 22:
                title.value = "Become World Boxing Champion";
                break;
            case 23:
                title.value = "Join the NBA";
                break;
            case 24: 
                title.value = "Become a millionaire";
                break;
            case 25:
                title.value = "Become a billionaire";
                break;
            case 26:
                title.value = "Become an astronaut";
                break;
        }
    })


    title.addEventListener('dblclick', (e) => {select_all_input(e)});
}

//Clears focus database
function remove_all_from_db() {
    let db;
    console.log('run')
    const open_request = indexedDB.open('student_file', 15)

    open_request.addEventListener('success', () => {
        db = open_request.result;
        const focus_transaction = db.transaction(['current_focus'], 'readwrite')
        const step_transaction = db.transaction(['steps_list'], 'readwrite');
        const steps_object_store = step_transaction.objectStore('steps_list');
        const focus_object_store = focus_transaction.objectStore('current_focus');
        steps_object_store.clear();
        focus_object_store.clear();
    })

    open_request.addEventListener('error', () => {
        custom_alert('Failed to Open database', 'error', 'Failed to open database', false, false)
    })

    
}

export function return_steps_list() {
    return steps_list;
}
