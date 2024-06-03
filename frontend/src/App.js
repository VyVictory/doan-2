import logo from './logo.svg';
import './App.css';
//import { Navbar, Nav } from 'react-bootstrap';
import Navbar from './user/Navbar';
import Event from './user/centter/event'
function App() {
  return (
    <div className="App">

      {/* Other compone      <Navbar />
nts/content */}
      <div className="container">

        <h1>Welcome to My Shop</h1>
      </div>

      <header className="App-header">
        <Event />
        
      </header>
    </div>
  );
}

export default App;
