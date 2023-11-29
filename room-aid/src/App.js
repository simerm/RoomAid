import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MyCalendar from './components/MyCalendar';
import Grocery from './components/Grocery';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="App">
      <header className="nav-bar">
        <NavBar/>
        <Router>
          <Routes>
            <Route exact path="/" element = {<TaskBoard/>}/>
            <Route path="/grocery" element = {<Grocery/>}/>
            <Route path="/calendar" element = {<MyCalendar/>}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
