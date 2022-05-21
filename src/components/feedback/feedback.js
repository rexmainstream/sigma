import React from "react";
import add_inline_animation from "../../res/scripts/animation_timing";
import Tabs, { TabPane } from 'rc-tabs';
import Radio_button_container from "./radio_button_container";
import move_to_top from "../../res/scripts/move_to_top";
import bug from "../../res/images/bugs.jpg"

export default class Feedback extends React.Component {

    componentDidMount() {
        initialise_feedback();
    }


    render() {
        function clear_form() {
            const inputs = document.querySelectorAll('input');
            const description = document.querySelectorAll('.show_description_input');

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type === "radio") {
                    inputs[i].checked = false;
                } else {
                    inputs[i].value = "";
                }
            }
            
            for (let i = 0; i < description.length; i++) {
                description[i].classList.remove('show_description_input');
            }

        }
        //Form is adds results to google forms.
        //This allows us to style it but also view results dynamically
        return(
            <div className="feedback">
                <iframe name="hidden_iframe" id="hidden_iframe" style={{display: "none",}} 
                > 

                </iframe>
                <form
                    noValidate
                    className="form"
                    autoComplete="off"
                    action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfRgKi2DPemroDP1Jpr6BjhTahl75sIZRm6ucaWdhR_zDSGSQ/formResponse"
                    target="hidden_iframe"
                    method="post"
                    >
                    <Tabs 
                        defaultActiveKey="1" 
                        animated={{ inkBar: true, tabPane: false }}
                        onTabClick={() => {
                            initialise_feedback();
                        }}>
                        <TabPane tab="Report a bug" key="1">
                            <div className="box">
                                <label>Please list bugs and problems you have encountered.</label>
                                <input type="text" name="entry.246120418" placeholder="Your Answer"/>
                            </div>
                            <img src={bug} alt="a bug" />

                            <Radio_button_container
                                radio_buttons = {[
                                    new Radio_button_constructor("Yes", "entry.1828907865"),
                                    new Radio_button_constructor("No", "entry.1828907865")
                                ]}

                                button_title = "Have you experienced poor load times when using Sigma?"
                                required = {false}              
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
                        </TabPane>
                        <TabPane tab="Survey" key="2">
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
                                new Radio_button_constructor("Yes", "entry.1889942573"),
                                new Radio_button_constructor("No", "entry.1889942573")
                            ]}

                            
                            button_title = "Would you recommend Sigma to your friends at Sydney Boys?"
                            required = {false}
                            description = {true}
                            description_placeholder = "Why or why not?"
                            description_entry = "entry.379919253"
                        />

                        <Radio_button_container
                            radio_buttons = {[
                                new Radio_button_constructor("Yes", "entry.823172926"),
                                new Radio_button_constructor("No", "entry.823172926")
                            ]}
                            
                            button_title = "Do you like the 'look and feel' of Sigma?"
                            required = {false}
                            description = {true}
                            description_placeholder = "Why or why not?"
                            description_entry = "entry.1454257089"
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
                        </TabPane>
                    </Tabs>
                    <div className="button_container">
                        <button 
                            type="submit" 
                            className="clickable_button" 
                            title="Submit Form"

                            onClick={
                                () => {
                                    // Clears the form when clicked
                                    clear_form();
                                    move_to_top();
                                }
                            }
                        >
                            Submit Form
                        </button>
                        <button 
                            className="clickable_button" 
                            value=""
                            title="Clear Form"
                            onClick={
                                () => {
                                    move_to_top();
                                    clear_form();
                                }
                            }
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function initialise_feedback() {
    // Adds animations
    // const focus = document.querySelector('div[role="tabpanel"][aria-hidden="false"]');
    // const input_boxes = focus.querySelectorAll('.box');
    // const amount_of_input_boxes = input_boxes.length;
    // let animation_delay = 0;

    move_to_top();
    // for (let i = 0; i < amount_of_input_boxes; i++) {
    //     input_boxes[i].style.animationDelay = `${animation_delay}s`;
    //     animation_delay += 0.3;
    // }
    // console.log(focus)
    // console.log(amount_of_input_boxes)
    // for (let i = 0; i < amount_of_input_boxes; i++) {
    //     add_inline_animation(input_boxes[i], `bounce 0.4s ease-out both ${animation_delay}s`, "", "", "", "", false);
    //     animation_delay += 0.3;
    // }
    // animation_delay = 0;

}

//This is the function of a radio button constructor
function Radio_button_constructor(label_name, entry) {
    this.label_name = label_name;
    this.entry = entry;
}