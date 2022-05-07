import React from 'react';
import ReactDOM from 'react-dom';
import { return_steps_list } from './focus';

export default function Progress_bar(props) {
    const progress = props.progress;
    const my_style = {
        width: `${progress}%`,    
    };

    return (
        <div id='progress_container'>
            <div id="progress" style={my_style}><span>{progress}%</span></div>     
        </div>
                  
    )
}


//This function renders the progress bar.
export function render_progress() {
    const container = document.querySelector('#progress_bar');
    const steps_list = return_steps_list()
    let progress_percentage
    let steps_completed = 0;
    //Get amount completed
    for (const step of steps_list) {
        if (step.completed === true) {
            steps_completed += 1;
        }
    }

    progress_percentage = Math.round((steps_completed / steps_list.length) * 100);


    ReactDOM.render(<Progress_bar progress={progress_percentage} />, container);  
}