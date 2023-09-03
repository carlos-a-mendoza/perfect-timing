import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "./Calendar.scss";
import {useState, useEffect} from "react";
import AddEventForm from '../AddEventForm/AddEventForm';
import axios from "axios";
import dayjs from "dayjs";
import ServerDay from "./ServerDay";

export default function Calendar() {

  const[showModal, setShowModal] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [value, setValue] = useState(dayjs());

  const showAddEventModal = () =>{
        setShowModal(true);
  }

  const obtainEventData = async () => {
    try{
      const response = await axios.get("http://localhost:8080/users/1");
      const eventData = response.data;
      console.log(eventData)
      const currentMonth = value.month();
      const daysThatNeedToBeSelected = eventData.map((event)=> {
        const eventDate = dayjs(event.event_date);
        const eventMonth = eventDate.month();
        if(eventMonth === currentMonth){
          const dayNumber = parseInt(eventDate.format('D'), 10)
          return dayNumber;
        }
        return null;
      }).filter(dayNumber => dayNumber !==null);
      setHighlightedDays(daysThatNeedToBeSelected);
    }catch (error){
      console.error("Cannot obtain events", error);
    }
  };

  useEffect(() =>{
    obtainEventData(value)
  },[value]);

  const handleMonthChange = (newDate) => {
    setValue(newDate);
    obtainEventData(newDate);
  };

  const handleCalendarClick =(event) =>{
    event.preventDefault();
  }

  if(highlightedDays.length === 0){
    return <p>Loading...</p>
  }

  console.log(highlightedDays)

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <StaticDatePicker orientation="portrait" value={value} highlightedDates={highlightedDays} onChange={(newValue)=>{setValue(newValue)}} onMonthChange={handleMonthChange} onClick={handleCalendarClick}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />

      </LocalizationProvider>
      <div className="calendar__container">
                <button className="calendar__button" onClick={()=>{showAddEventModal();}}>Add Event</button>
                <button className="calendar__button">Create Group Event</button>
      </div>
      {showModal && (<AddEventForm/>)}  
    </div>  
  );
}