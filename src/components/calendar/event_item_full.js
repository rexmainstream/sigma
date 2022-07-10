import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { convert_date_to_str, get_date } from './rolyart-calendar';
import reactStringReplace from 'react-string-replace';
import add_inline_animation from '../../res/scripts/animation_timing';

export default function Event_item_full(props) {
    let days_left = props.days_left;
    let description = props.description;
    let title = props.title;
    const priority = props.priority;
    const due_date = props.due_date;
    const search = props.search;
    const completed = props.completed;
    let class_name = 'event_item_full';
    let animation_complete = true;

    let show_description_class = ["event_description hide_description", "Show Description"];

    // debug
    // console.log(search);

    if (completed === true) {
        class_name += ' event_completed';
    }

    if (search !== false) {
        // Search is case insensitive, regular expression required
        const search_case_insens = new RegExp(`(${search})`, "gi");

        // finds the search word in the title then adds a highlight class
        // to it
        title = reactStringReplace(title, search_case_insens, (match, i) => (
            <span
                className = 'search_word'
                key = { i } 
            >
                { match }
            </span>
        ));

        description = reactStringReplace(description, search_case_insens, (match, i) => (
            <span
                className = 'search_word'
                key = { i } 
            >
                {match}
            </span>
        ))

        if (description.length > 1 && search !== "") {
            show_description_class[0] = "event_description show_description"
            show_description_class[1] = "Hide Description"
        }       

    }


    let tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);


    switch (days_left) {
        case get_date().today:
            days_left = 'Today';
            break;
        case convert_date_to_str(tomorrow).date:
            days_left = 'Tomorrow';
            break;
        case '':
            break;
        default:
            days_left = `${days_left}`;
    }

    // Shows the description
    function show_description(e) {
        // console.log(e.currentTarget.parentNode.parentNode.parentNode);

        const description = e.currentTarget.parentNode.parentNode.parentNode.querySelector('.event_description');
        if (description.classList.contains('hide_description')) {
            description.classList.replace("hide_description", "show_description");
            e.currentTarget.parentNode.setAttribute('title', 'Hide Description');
        } else {
            description.classList.replace("show_description", "hide_description");
            e.currentTarget.parentNode.setAttribute('title', 'Show Description');
        }
    }

    // Hides the group
    function show_hide_group(e) {
        const event_group = e.currentTarget.parentNode.parentNode.parentNode;
        event_group.style.maxHeight = `${event_group.scrollHeight}px`;

        if (event_group.classList.contains('hide_event_group') === false) {

            animation_complete = false;
            event_group.classList.add('hide_event_group');
            add_inline_animation(event_group, "collapse 0.8s ease-out 0.4s", "", "", "", "", () => {
                console.log('hello')
                animation_complete = true;
                event_group.style.maxHeight = null;
                // event_group.classList.add('hide_event_group');
            });
        } else {
            // event_group.style.maxHeight = null;
            animation_complete = false;
            event_group.classList.add('show_event_group')
            event_group.classList.remove('hide_event_group');
            event_group.addEventListener('transitionend', function handler() {
                event_group.style.maxHeight = null;
                event_group.classList.remove('show_event_group');
                animation_complete = true;
                event_group.removeEventListener('transitionend', handler)
            })
        }

    }

    return (
        <div className='event_item_container'>
            <div className='timeline'>
                <div 
                    className='days_left'
                    title = 'Hide Group'
                    onMouseOver = {
                        (e) => {
                            // if (animation_complete === true) {
                            //     highlight_group(e);
                            // }
                        }
                    }

                    onMouseLeave = {
                        (e) => {
                            // if (animation_complete === true) {
                            //     highlight_group_time_out(e)
                            // }
                        }
                    }

                    onClick = {
                        (e) => {
                            if (animation_complete === true) {
                                show_hide_group(e);
                            }
                        }
                    }
                >
                    <span>
                        {`${days_left}`}
                    </span>                
                </div>

                <div 
                    className='vl'
                    onMouseEnter = {
                        (e) => {
                            // highlight_group(e);
                        }
                    }

                    onMouseLeave = {
                        (e) => {
                            // highlight_group_time_out(e);
                        }
                    }

                    onClick = {
                        (e) => {
                            if (animation_complete === true) {
                                show_hide_group(e);
                            }
                        }
                    }
                >

                </div>
            </div>
            <div 
                className= { class_name }
                aria-label='full event item'
            >
                <h2 className='event_title'>
                    { title }
                </h2>
                <hr></hr>
                <div>
                    { `Priority: ${ priority }` }
                </div>
                <div>
                    { `Due Date: ${ due_date }` }
                </div>
                <div className = {show_description_class[0]}>
                    { description }
                </div>
                <div className ="button_container">
                    <button 
                        title = {show_description_class[1]} 
                        className = "description_button"
                    >
                        <FontAwesomeIcon 
                            icon = { faChevronDown }
                            onClick = { (e) => {
                                // Debug
                                // console.log('Clicked!')

                                show_description(e)
                            }} 
                        />
                    </button>
                </div>
            </div>
        </div>

    )
}