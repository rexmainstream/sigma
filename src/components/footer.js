import React from "react";

export default function Footer() {
    return (
        <footer>

            <div className="flex center_vertical">
                <div className="footer_legal">
                    <ul className="end_user_agreements link_list">
                        <li><a href="">About us</a></li>
                        <li><a href="">Contact us</a></li>
                        <li><a href="">License Agreement</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="https://github.com/rexmainstream/sigma" target="_blank" rel="noopener noreferrer">Github</a></li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className="footer_copyright">
                Copyright © 2022 Sigma Inc. All rights reserved.
            </div>

  
        </footer>
    );
}