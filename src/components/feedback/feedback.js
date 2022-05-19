import React from "react";

let form_height = `1600px`;
export default class Feedback extends React.Component {

    componentDidMount() {
        //loading_screen();
        //Opens loading screen
    }

    render() {
        
        function finish_loading_iframe() {
            console.log('hello');
        }

        return(
            <div className="feedback center_vertical">
                <iframe onLoad={finish_loading_iframe()} src="https://docs.google.com/forms/d/e/1FAIpQLSfRgKi2DPemroDP1Jpr6BjhTahl75sIZRm6ucaWdhR_zDSGSQ/viewform?embedded=true" width='100%' scrolling="no" height="1600px" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
            </div>
        )
    }
}