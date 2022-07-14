import './res/styles/index.css';
import Header from './components/header';
import Footer from './components/footer'
import Dashboard from './components/dashboard';
import logo from './res/images/Logo-Vector-Graphics.svg'
import Motivational_quote from './components/quote/motivational_quote';
import Focus from './components/focus/focus';
import Feedback from './components/feedback/feedback';
import About from './components/about/about';
import Help from './components/help/help';
import Full_calendar from './components/calendar/calendar_full';
import { check_mobile } from './res/scripts/check_mobile';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";


var Page_link = Dashboard
function App() {

  let links = (
    <nav>
    <ul className='link_list'>
      <li>
        <NavLink
          to={"/about"}
          tabIndex={1}>
            About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/calendar"}
          tabIndex={1}>
            Calendar
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/focus"}>
          Focus
        </NavLink>
      </li>
      <li>
        <a href=''><Link to="/help">Help</Link></a>
      </li>
      <li>
        <NavLink
          to={"/feedback"}>
            Feedback
        </NavLink>
      </li>
      <li>
          <NavLink
            to={"/quote_of_the_day"}>
              Quote of the Day
          </NavLink>
      </li>
      <li className="log_out"><a href=''>Log out</a></li>
    </ul>
  </nav>
  )

  // If mobile
  if (check_mobile()) {
    links = (
      <div>
        <nav className='drop_down_nav'>
          <ul className='link_list drop_down_header'>
            <span>
              <span
                onClick= {
                  (e) => {
                    const link_list = e.currentTarget.parentNode.parentNode
                    link_list.classList.toggle('show_dropdown_header');
                    link_list.focus();
                  }
                } 
                onMouseLeave = {
                  (e) => {
                    e.currentTarget.parentNode.parentNode.classList.remove('show_dropdown_header');                  
                  }
                }             
              >
                Services
              </span>
              <FontAwesomeIcon icon={faChevronDown}/>
            </span>
            <li>
              <NavLink
                to={"/about"}
                tabIndex={1}>
                  About
              </NavLink>
            </li>
            <li>
              <NavLink
                to = {'/calendar'}
                tabIndex = {1}
              >
                Calendar                
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/focus"}>
                Focus
              </NavLink>
            </li>
            <li>
              <a href=''><Link to="/help">Help</Link></a>
            </li>
            <li>
              <NavLink
                to={"/feedback"}>
                  Feedback
              </NavLink>
            </li>
          </ul>
          <ul className='link_list'>
          <li>
            <NavLink
              to={"/quote_of_the_day"}>
                Quote of the Day
            </NavLink>
          </li>
          <li className="log_out"><a href=''>Log out</a></li>
          </ul>
        </nav>
      </div>
    )
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='navigation'>
          <div className='flex header'>
            <a href=''>
              <Link to="/"
                tabIndex={-1}>
                <img src={logo}
                  className='logo'
                  alt='logo for Sigma'
                  title='Return home'
                  aria-hidden='true'>
                </img>
              </Link>
            </a>
            { links }
          </div>
        </header>
        <main>

          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path='/focus' element = {<Focus />} />
            <Route exact path='/quote_of_the_day' element = {<Motivational_quote />} />
            <Route path="/calendar" element={<Full_calendar />} exact />
            <Route path="/help" element={<Help />} exact />
            <Route path='/about' element={<About />} exact />
            <Route path='/feedback' element={<Feedback />} exact />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
