import React from "react";
import { NavLink } from "react-router-dom";
import add_inline_animation from "../../res/scripts/animation_timing";
import { Add_scroll_event } from "../../res/scripts/scroll";

export default class About extends React.Component {
    componentDidMount() {
        const information_boxes = document.querySelectorAll('.about_info');
        window.scrollTo(0, 0);

        let animation_delay = 0;

            for (let i = 1; i < information_boxes.length; i++) {
                information_boxes[i].style.opacity = "0";
            }

            //console.log(information_boxes[i])
            Add_scroll_event(information_boxes[1], () => {
                for (let i = 1; i < information_boxes.length; i++) {
                    add_inline_animation(information_boxes[i], "bounce", "0.7s", "ease-out", `${animation_delay}s`, "both", false)
                    animation_delay += 0.4;
                    information_boxes[i].style.opacity = "1";
                }
            }, false, 400)
            //console.log(animation_delay)
            //Add_scroll_event()
    }
    render() {
        return(
            <div className="about">
                    <div className="about_info our_mission">
                        <h1>Our Mission</h1>
                        <p>
                            Our mission is to provide a software solution that elevates
                            and inspires Sydney Boys High students.
                        </p>
                    </div>
                <div className="about_flex">
                    <div className="about_info about_us">
                        <h1>About us</h1>
                        <p>
                            Sigma was created by Alex Jiang, Terence Lim and Maxime Jalbert-Locke with minor contributions from Robin Hu and Hugo Leung.
                            This project was part of the 2022 Software Design and Development HSC Major Project. 
                        </p>
                    </div>

                    <div className="our_story about_info">
                        <h1>Our Journey</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem ex, cursus a augue vitae, posuere blandit augue. Mauris blandit vehicula quam ac pellentesque. Vestibulum mauris risus, elementum quis enim eu, convallis vulputate dolor. Integer vestibulum mauris eu quam semper, in malesuada nulla efficitur. Fusce ac vulputate lorem. Integer suscipit tempor libero vel convallis. Phasellus egestas est in lacinia tempus. Donec vitae aliquet odio. Pellentesque vel felis urna. Phasellus sit amet libero eu ligula tempus elementum sit amet at lectus. Nunc iaculis nibh in posuere auctor. Nunc a odio augue. Etiam molestie pharetra efficitur.
                        </p>
                    </div>
                </div>


                <div className="about_flex">
                    <div className="about_info features">
                        <h1>Features</h1>
                        <ul>
                            <li>Over 2000 hand picked quotes from the <NavLink to={"/quote_of_the_day"}>Quote of the Day</NavLink>.</li>
                            <li>A calendar and task system with search and sort capabilities.</li>
                            <li>Offline access.</li>
                            <li>Ability to set long term goals through a focus.</li>
                            <li>Ability to generate barcodes to scan on.</li>
                            <li>Ability to print timetable, tasks and focus.</li>
                            <li>Ability to view a school timetable and classes.</li>
                        </ul>
                    </div>
                    <div className="about_info our_values">
                        <h1>Our Values</h1>
                        <p>
                            We value your privacy. Sigma does not intentionally store personal information, and will NOT modify or access any personal information.
                            We also value diversity and inclusion, we will engage with your <NavLink to={"/feedback"}>feedback</NavLink> to enhance your user experience.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}