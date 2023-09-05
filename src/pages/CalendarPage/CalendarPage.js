import "./CalendarPage.scss";
import Calendar from "../../Components/Calendar/Calendar";
import Header from "../../Components/Header/Header";

function CalendarPage(){

    return(
        <div className="calendar-page">
            <Header/>
            <Calendar/>
        </div>

    )
}

export default CalendarPage;