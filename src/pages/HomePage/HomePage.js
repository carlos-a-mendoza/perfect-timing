import AddEventForm from "../../Components/AddEventForm/AddEventForm";
import Calendar from "../../Components/Calendar/Calendar";
import "./HomePage.scss";
import WeekCalendar from "../../Components/WeekCalendar/WeekCalendar";

function HomePage(){

    return(
        <div className="home">
            <h1 className="home__header">Good Day User!</h1>
            <div className="home__container">
                <WeekCalendar/>
            </div>
            
            <h2 className="home__subheading">Upcoming Events </h2>
            <div className="home__event">
                <p className="home__event-name"></p>
                <p className="home__event-description"></p>
            </div>
        </div>
    )
};

export default HomePage;

