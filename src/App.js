import "./App.scss";
import Header from "./Components/Header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/my-calendar" element={<CalendarPage/>}/>
          <Route path="/my-profile" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
