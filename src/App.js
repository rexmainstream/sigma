import './res/styles/index.css';
import Header from './components/header';
import Footer from './components/footer'
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;


