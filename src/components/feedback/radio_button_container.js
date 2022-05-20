import React from "react";

export default function Radio_button_container(props) {
    //Gets properties
    const radio_buttons = props.radio_buttons;
    const title = props.button_title;
    const required = props.required;
    const amount_of_buttons = radio_buttons.length;
    let radio_buttons_element_array = [];
    let required_asterisk = (<span></span>);

    for (let i = 0; i < amount_of_buttons; i++) {
        radio_buttons_element_array.push(
            //radio buttons array
            <div key={i} className="radio_button_container">
                <input 
                    name={radio_buttons[i].entry} 
                    type="radio" 
                    required={required} 
                    value={radio_buttons[i].label_name}
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
            </div>
        </div>
    )
}