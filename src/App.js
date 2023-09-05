import "./App.scss";
import Header from "./Components/Header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EventsPage from "./pages/EventsPage/EventsPage";
import CreateGroupEvent from "./Components/CreateGroupEvent/CreateGroupEvent";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/my-calendar" element={<CalendarPage/>}/>
          <Route path="/my-profile" element={<ProfilePage/>}/>
          <Route path="/my-events" element={<EventsPage/>}/>
          <Route path="/group-event" element={<CreateGroupEvent/>}/>  
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
