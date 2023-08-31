import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "./Calendar.scss";
import {useState} from "react";
import AddEventForm from '../AddEventForm/AddEventForm';

export default function Calendar() {

  const[showModal, setShowModal] = useState(false);

  const showAddEventModal = () =>{
        setShowModal(true);

  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <StaticDatePicker orientation="portrait" onClick={()=>{showAddEventModal();}}/>
      </LocalizationProvider>
      <div className="calendar-page__container">
                <button className="calendar-page__button" onClick={()=>{showAddEventModal();}}>Add Event</button>
      </div>
      {showModal && (<AddEventForm/>)}
    </div>  


  );
}