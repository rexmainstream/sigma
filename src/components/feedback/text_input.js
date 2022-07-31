// Alex

// Imports
import React from "react";


// This is the text input box that links to the google forms.
export default function Text_input_form(props) {
    const title = props.title;
    const entry = `entry.${props.entry}`;
    let placeholder = props.placeholder;

    // Default value for placeholder
    if (placeholder === undefined) {
        placeholder = "Your Answer"
    }

    // Expands or reduce the input box if the input is larget or small
    function expand_textarea(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }

    // HTML Return
    return(
        <div className="box">
            <label
                htmlFor = { entry }
            >
                { title }            
            </label>
            <textarea 
                onInput = {
                    (e) => {
                        expand_textarea(e.target);
                    }
                } 
                type="text" 
                name={ entry } 
                placeholder={ placeholder }
            />
        </div>
    )
}