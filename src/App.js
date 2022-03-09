import './res/styles/index.css';
import Header from './components/header';
import Footer from './components/footer'
import Dashboard from './components/dashboard';
import Timetable from './components/timetable/timetable_dashboard';
import logo from './res/images/Logo-Vector-Graphics.svg'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";


import Timetable_mini from './components/dashboard/timetable_mini';
import Calendar_mini from './components/dashboard/calendar_mini';

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
                <li className="drop_down">
                  <a href=''><Link to="/timetable">Timetable</Link></a>
                </li>
                <li>
                  <a href=''><Link to="/calendar">Calendar</Link></a>
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
            <Route path="/timetable" element={<Timetable />} exact />
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
