import React from 'react';
import add_inline_animation from '../../res/scripts/animation_timing';
import ReactDOM from 'react-dom'
import { tooltip_time_out } from './event_item';

let currently_hovering_over = false;

export default class Event_tooltip extends React.Component {

    // Properties
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.desc,
            priority: this.props.priority,
            due_date: this.props.due_date,
            completed: this.props.completed,
            visible: this.props.visible,
        }
    }




    render() {
        // Debug
        // console.log( this.state )


        const tooltip_class = 'event_tooltip show_tooltip';
        let status;


        const due_date = new Date( this.state.due_date )
        const today = new Date();

        const difference = due_date.getTime() - today.getTime();
        let total_days = Math.ceil(difference / (1000 * 3600 * 24));

        if (total_days === 0) {
            total_days = "Today";
        } else if (total_days === 1) {
            total_days = "Tomorrow";
        } else {
            total_days = `In ${ total_days } days`;
        }

        // Status setting
        if (this.state.completed === true) {
            status = "Complete";
        } else {
            status = "Incomplete";
        }

        // If no description then sets event description to a prompt
        if (
            this.state.description.replace(/\r?\n|\r/g, "") === '' 

            || 

            this.state.description.replace(/\s+/g, '') === ''
        ) {


            this.state.description = "This event has no description";
        }

        function remove_tooltip() {

            const root = document.getElementById('tooltip_container');
            const tooltip = root.querySelector('.event_tooltip');


            add_inline_animation(tooltip, 'show_tooltip 0.2s ease-out both reverse', '', '', '', '', () => {
                ReactDOM.unmountComponentAtNode(root);


                // Debug
                // console.log('Tooltip is removed');
    
            })
        }

        if ( this.state.visible === true ) {
            return (
                <div 
                    className = { tooltip_class }
                    onAnimationEnd = {
                        (e) => {
                            // Removes classlist at animation end
                            e.currentTarget.classList.remove('show_tooltip');

                        }
                    }

                    onMouseOver = {
                        () => {
                            // Sets flag to true
                            currently_hovering_over = true;
                        }
                    }
                    
                    onMouseLeave = {
                        () => {
                            // Removes tooltip when not hovering over
                            currently_hovering_over = false;
                            remove_tooltip();
                        }
                    }
                    
                >
                    <h3>{ this.state.title }</h3>
                    <div className='flex'>
                        <div className='grid_label'>
                            <label>Priority:</label>
                                <p> { `${ this.state.priority }` } </p>
                                
                            <label>Due:</label>
                                <p> { `${ total_days }` } </p>

                            <label>Status:</label>
                                <p> { `${ status }` } </p>
                        </div>

                        {/* 
                            For some reason, there is no line breaks for <p> 
                            and <div> therefore we used a textarea 
                        */}
                        <textarea 
                            className = 'event_description'
                            readOnly = { true }
                            value = { this.state.description }
                        >                    
                        </textarea>
                    </div>

                </div>
            )
        }
    }
}


export function return_currently_hovering_over() {
    return currently_hovering_over;
}