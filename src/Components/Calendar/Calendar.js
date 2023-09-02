import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "./Calendar.scss";
import {useState, useEffect} from "react";
import AddEventForm from '../AddEventForm/AddEventForm';
import Badge from '@mui/material/Badge';
import axios from "axios";
import dayjs from "dayjs";

export default function Calendar() {

  const[showModal, setShowModal] = useState(false);
  const [daysWithEvents, setDaysWithEvents] = useState([])

  const showAddEventModal = () =>{
        setShowModal(true);
  }

  useEffect(()=>{
    axios
      .get("http://localhost:8080/users/1")
      .then((response)=>{
        const eventData = response.data;
        const daysThatNeedToBeSelected = eventData.map((event)=> dayjs(event.event_date).date());
        setDaysWithEvents(daysThatNeedToBeSelected);
        console.log(setDaysWithEvents);
      })
      .catch((error)=>{
        console.error("Cannot obtain events", error)
      })
  }, [])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <StaticDatePicker orientation="portrait" onClick={()=>{showAddEventModal();}} value={dayjs()} highlightedDates={daysWithEvents} />
      </LocalizationProvider>
      <div className="calendar__container">
                <button className="calendar__button" onClick={()=>{showAddEventModal();}}>Add Event</button>
                <button className="calendar__button">Create Group Event</button>
      </div>
      {showModal && (<AddEventForm/>)}
      {daysWithEvents.map((day, index)=>(
        <Badge key={index} overlap="circular" badgeContent=" ">{day}</Badge>
      ))}
    </div>  


  );
}