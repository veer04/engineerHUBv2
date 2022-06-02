 import './App.css';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Components/HomePage/HomePage';
import MagzineAndHandbook from './Components/magzineandHandbook/magzineAndHandbook';


function App() {
  return (
    <div className="App">
     <NavBar/>
     <HomePage/>
     {/* <MagzineAndHandbook/> */}
    </div>
  );
}

export default App;
