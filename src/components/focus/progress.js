// Alex

// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Add_scroll_event, check_scroll_pos } from '../../res/scripts/scroll';
import { check_focus, complete_focus, return_steps_list } from './focus';

export default function Progress_bar(props) {
    let progress = props.progress;

    let my_style = {
        width: `${progress}%`,    
    };
    let class_name = "progress";

    
    return (
        <div className='progress_container'>
            <div className={class_name} style={my_style}><span>{progress}%</span></div>     
        </div>
                  
    )
}


//This function renders the progress bar.
export function render_progress() {
    const container = document.querySelector('.progress_bar');
    const steps_list = return_steps_list()
    let progress_percentage
    let steps_completed = 0;

    //Get amount of steps completed
    for (const step of steps_list) {
        if (step.completed === true) {
            steps_completed += 1;
        }
    }

    progress_percentage = Math.round((steps_completed / steps_list.length) * 100);

    //If there are no steps 
    if (steps_list.length === 0) {
        progress_percentage = 0
    }
    
    ReactDOM.render(<Progress_bar progress={progress_percentage} />, container);
    check_focus();
}