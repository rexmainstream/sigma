import './index.css';
import Header from './components/header';
import Footer from './components/footer'
import Timetable_mini from './components/index/timetable_mini';
import Calendar_mini from './components/index/calendar_mini';
import Motivational_quote from './components/motivational_quote';
import Focus_mini from './components/index/focus_mini';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <div className='grid_wrapper'>
          <Timetable_mini />
          <Calendar_mini />
          <Motivational_quote />
          <Focus_mini />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
