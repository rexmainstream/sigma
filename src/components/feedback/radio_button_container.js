import React from "react";

export default function Radio_button_container(props) {
    //Gets properties
    const radio_buttons = props.radio_buttons;
    const title = props.button_title;
    const required = props.required;
    const amount_of_buttons = radio_buttons.length;
    const description = props.description;
    const description_placeholder = props.description_placeholder;
    const description_entry = props.description_entry;
    let radio_buttons_element_array = [];
    let required_asterisk = (<span></span>);
    let description_input;

    if (description === true) {
        description_input = (
            <input 
                type="text"
                name={description_entry}
                placeholder= {description_placeholder}
                className="additional_description"
            >

            </input>
        )
    }

    //Shows the description if user presses radio button
    function Show_description(e) {
        //console.log(e.target.parentNode.parentNode.querySelector(".additional_description"))
        const description_input = e.target.parentNode.parentNode.querySelector(".additional_description");
        description_input.classList.add('show_description_input');
    }

    for (let i = 0; i < amount_of_buttons; i++) {
        radio_buttons_element_array.push(
            //radio buttons array
            <div key={i} className="radio_button_container">
                <input 
                    name={radio_buttons[i].entry} 
                    type="radio" 
                    required={required} 
                    value={radio_buttons[i].label_name}
                    onClick={

                        (e) => {
                            if (description === true) {
                                Show_description(e);
                            }
                        }
                    }
                    />
                <label htmlFor = {radio_buttons[i].entry}>
                    {radio_buttons[i].label_name}
                </label>
            </div>
        )

    }



    if (required === true) {
        required_asterisk = (
        <span className="required_asterisk">
            *
        </span>
        )
    }

    return (
        <div className="box">
            <label>{title}</label>
            {required_asterisk}
            <div>
                {radio_buttons_element_array}
                {description_input}
            </div>
        </div>
    )
}