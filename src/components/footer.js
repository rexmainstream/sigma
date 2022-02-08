import React from "react";

export default function Footer() {
    return (
        <footer id="nav_footer">
            <div className="flex">
                <div className="grid_wrapper">
                    <ul className="link_list" id='reference_links'>
                        <li><a href="">About</a></li>
                        <li><a href="">Feedback</a></li>
                        <li><a href="">Contact Us</a></li>
                    </ul>
                    <p id='license'>© Sigma 2022 content is available under these licenses:</p>
                    <ul className="link_list">
                        <li><a href="">Terms</a></li>
                        <li><a href="">eUla</a></li>
                        <li><a href="">License Agreement</a></li>
                    </ul>
                </div>
            </div>       
        </footer>
    );
}