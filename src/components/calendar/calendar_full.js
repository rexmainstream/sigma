// Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Full_events from "./events_full";
import { RolyartCalendar } from "./rolyart-calendar-full";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ReactDropdown from "react-dropdown";


export default class Full_calendar extends React.Component {

    componentDidMount() {
        // Scrolls to top when user enters the page
        window.scrollTo(0, 0);
        initialise_full_calendar()
    }

    render() {

        const drop_down_options = [
            {
                value: 1,
                label: 'My Day'
            },

            {
                value: 7,
                label: 'My Week'
            },

            {
                value: 30,
                label: 'My Month'
            },

            {
                value: 356,
                label: 'My Year'
            }
        ];


        function show_events( day_range, sort_function ) {
            console.log('hello');
            console.log(day_range)
        }

        return (
            <div 
                id = "full_calendar"
            >
                <div id = "calendar_container">

                </div>
                <div id = "full_events">


                    <ReactDropdown 
                        options = {drop_down_options} 
                        placeholder={'Please select an option'} 
                        value = {drop_down_options[0]}
                        onChange = { show_events(this.value) }
                    />


                    <div className="search_and_sort">
                        <div className="search_bar_container">
                            <FontAwesomeIcon icon = {faSearch} size = 'lg' />
                            <input 
                                className="search_bar"
                                placeholder="Search Events..."
                            >
                                
                            </input>
                            <FontAwesomeIcon icon = {faTimes} size = '2x' title="Clear Search" />
                        </div>
                        <div className="drop_down">
                            <span>
                                Sort
                                <span class="caret">▼</span>
                            </span>
                            <li>
                                By due date
                            </li>
                            <li>
                                By priority
                            </li>
                        </div>
                    </div>


                    <Full_events />
                </div>


            </div>
        )
    }
}

function initialise_full_calendar() {
    // Debug
    // console.log('initialise full calendar run!');

    let calendarConfig = {
        container: 'calendar_container',
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    }

    const calendar = new RolyartCalendar(calendarConfig);
}