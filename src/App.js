 import './App.css';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Components/HomePage/HomePage';
import Hiring from './Components/Hiring/Hiring';


function App() {
  return (
    <div className="App">
     <NavBar/>
     {/* <HomePage/> */}
     <Hiring/>
    </div>
  );
}

export default App;
