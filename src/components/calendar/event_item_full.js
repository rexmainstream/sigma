import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { convert_date_to_str, get_date } from './rolyart-calendar';
import reactStringReplace from 'react-string-replace';

export default function Event_item_full(props) {
    let days_left = props.days_left;
    let description = props.description;
    let title = props.title;
    const search = props.search;

    let show_description_class = ["event_description hide_description", "Show Description"];

    // debug
    // console.log(search);


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

        if (description.length > 1) {
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

    return (
        <div className='event_item_container'>
            <div className='timeline'>
                <div className='days_left'>{`${days_left}`}</div>
                <div className='vl'></div>
            </div>
            <div 
                className='event_item_full'
                aria-label='full event item'
            >
                <h2 className='event_title'>
                    { title }
                </h2>
                <hr></hr>
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