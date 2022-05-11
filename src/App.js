import './res/styles/index.css';
import Header from './components/header';
import Footer from './components/footer'
import Dashboard from './components/dashboard';
import Display_today_timetable from './components/timetable/timetable_display';
import logo from './res/images/Logo-Vector-Graphics.svg'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";


import Timetable_mini from './components/dashboard/timetable_mini';
import Calendar_mini from './components/dashboard/calendar_mini';
import Motivational_quote from './components/dashboard/motivational_quote';
import Focus from './components/focus/focus';

var Page_link = Dashboard
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='navigation'>
          <div className='flex header'>
            <a href=''>
              <Link to="/">
                <img src={logo}
                  className='logo'
                  alt='logo for Sigma'
                  title='Return home'
                  aria-hidden='true'>
                </img>
              </Link>
            </a>
            <nav>
              <ul className='link_list'>
                <li>
                  <a href=''><Link to="/calendar">Calendar</Link></a>
                </li>
                <li>
                  <NavLink
                    to={"/focus"}>
                    Focus
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/quote_of_the_day"}>
                      Quote of the Day
                  </NavLink>
                </li>
                <li>
                  <a href=''><Link to="/help">Help</Link></a>
                </li>
                <li className="log_out"><a href=''>Log out</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>

          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path='/focus' element = {<Focus />} />
            <Route exact path='/quote_of_the_day' element = {<Motivational_quote />} />
            <Route path="/calendar" element={<Calendar_mini />} exact />
            <Route path="/help" element={<Header />} exact />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}



export default App;
