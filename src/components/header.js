import React from 'react';
import logo from '../res/images/Logo-Vector-Graphics.svg'
//import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className='navigation'>
            <div className='flex header'>
                <a href='' className='logo_link'>
                    <img src={logo} 
                        className='logo' 
                        alt='logo for Sigma'
                        title='Return home'
                        aria-hidden='true'>
                    </img>
                </a>
                <nav>
                    <ul className='link_list'>
                        <li className="drop_down">
                            <a href=''><span className='drop_down_logo'>&#8250;</span>Services</a>
                        </li>
                        <li>
                            <a href=''>Settings</a>
                        </li>
                        <li>
                            <a href=''>Help</a>
                        </li>
                        <li className="log_out"><a href=''>Log out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}