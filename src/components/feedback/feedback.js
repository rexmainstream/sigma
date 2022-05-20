import React from "react";
import add_inline_animation from "../../res/scripts/animation_timing";
import Radio_button_container from "./radio_button_container";
import image from "../../res/images/feedback_image.avif"

export default class Feedback extends React.Component {

    componentDidMount() {
        const input_boxes = document.querySelectorAll('.box');
        const amount_of_input_boxes = input_boxes.length;
        let animation_delay = 0;

        window.scrollTo(0,0)
        for (let i = 0; i < amount_of_input_boxes; i++) {
            add_inline_animation(input_boxes[i], `bounce 0.4s ease-out both ${animation_delay}s`, "", "", "", "", false);
            animation_delay += 0.3;
        }
    }



    render() {
        //Form is adds results to google forms.
        //This allows us to style it but also view results dynamically
        return(
            <div className="feedback">
                <form 
                    className="form"
                    autoComplete="off"
                    onsubmit="submitted=!0"
                    action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfRgKi2DPemroDP1Jpr6BjhTahl75sIZRm6ucaWdhR_zDSGSQ/formResponse"
                    target="hidden_iframe"
                    method="post"
                    >
                    {/* Radio button container components. requires label name and entry number */}
                    <Radio_button_container 
                        radio_buttons = {[
                            new Radio_button_constructor('Yes', "entry.275069114"), 
                            new Radio_button_constructor("No", "entry.275069114")
                        ]}
                        
                        button_title = {"Do you allow your feedback to be used as potential features?"}
                        required = {true}
                    />

                    <Radio_button_container 
                        radio_buttons = {[
                            new Radio_button_constructor('Yes', "entry.1695270352"), 
                            new Radio_button_constructor("No", "entry.1695270352")
                        ]}
                        
                        button_title = {"Have you encountered any errors whilst using Sigma?"}
                        required = {true}
                    />

                    <div className="box">
                        <label>If you encountered any errors please list them.</label>
                        <input type="text" name="entry.246120418" placeholder="Your Answer"/>
                    </div>

                    <Radio_button_container
                        radio_buttons = {[
                            new Radio_button_constructor("Yes", "entry.1828907865"),
                            new Radio_button_constructor("No", "entry.1828907865")
                        ]}

                        button_title = "Have you experienced poor load times when using Sigma?"
                        required = {true}              
                    />
                    
                    <Radio_button_container
                        radio_buttons = {[
                            new Radio_button_constructor("Chrome", "entry.880881758"),
                            new Radio_button_constructor("Firefox", "entry.880881758"),
                            new Radio_button_constructor("Opera", "entry.880881758"),
                            new Radio_button_constructor("Safari", "entry.880881758"),
                            new Radio_button_constructor("Microsoft Edge", "entry.880881758"),
                            new Radio_button_constructor("Samsung Internet", "entry.880881758"),
                            new Radio_button_constructor("Mosaic", "entry.880881758"),
                        ]}

                        button_title = "What browser do you use?"
                        required = {false}              
                    />

                    <Radio_button_container
                        radio_buttons = {[
                            new Radio_button_constructor("Yes", "entry.1889942573"),
                            new Radio_button_constructor("No", "entry.1889942573")
                        ]}

                        
                        button_title = "Would you recommend Sigma to your friends at Sydney Boys?"
                        required = {true}
                    />

                    <div className="box">
                        <label 
                            htmlFor="entry.284096315">
                            Is there a quote you would recommend for "Quote of the Day?"
                        </label>
                        <input 
                            type="text" 
                            placeholder="Your Quote" 
                            name="entry.284096315" 
                        />
                    </div>

                    <div className="box">
                        <label 
                            htmlFor="entry.1696689808"
                        >
                            What are the current features you like about Sigma?
                        </label>
                        <input 
                            type="text" 
                            placeholder="Your Answer" 
                            name="entry.1696689808" 
                        />
                    </div>

                    <div className="box">
                        <label 
                            htmlFor="entry.120304055"
                        >
                            Do you have any additional suggestions/comments?
                        </label>
                        <input type="text" placeholder = "Your Answer" name="entry.120304055" />
                    </div>

                    <div className="button_container">
                        <button 
                            type="submit" 
                            className="clickable_button" 
                            value="send"
                            title="Submit Form"
                        >
                            Submit Form
                        </button>
                        <button 
                            type="reset" 
                            className="clickable_button" 
                            value=""
                            title="Clear Form"
                        >
                            Clear Form
                        </button>

                    </div>

                </form>
            </div>
        )
    }
}

function finish_loading_iframe() {
}

//This is the function of a radio button constructor
function Radio_button_constructor(label_name, entry) {
    this.label_name = label_name;
    this.entry = entry;
}