import "./CalendarPage.scss";
import Calendar from "../../Components/Calendar/Calendar";
import AddEventForm from "../../Components/AddEventForm/AddEventForm";

function CalendarPage(){
    return(
        <div>
            <Calendar/>
            <AddEventForm/>
        </div>
    )
}

export default CalendarPage;