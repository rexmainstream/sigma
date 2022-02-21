import React from "react";

export default function Footer() {
    return (
        <footer id="nav_footer">
            <div id="footer_container">
                <div id="social_container">
                    <b id="company_name">SIGMA</b>                    
                    <ul className="link_list">
                        <li><a href="">Instagram</a></li>
                        <li><a href="">Twitter</a></li>
                        <li><a href="">Facebook</a></li>
                    </ul>
                </div>
                
                <ul className="vertical_link_list">
                    <li>About us</li>
                    <li><a href="">Our Story</a></li>
                    <li><a href="">Our Team</a></li>
                    <li><a href="">Contact Us</a></li>
                </ul>
                <ul className="vertical_link_list">
                    <li>Legal</li>
                    <li><a href="">Terms and Conditions</a></li>
                    <li><a href="">Privacy</a></li>
                    <li><a href="">License Agreement</a></li>
                </ul> 
            </div>
  
        </footer>
    );
}