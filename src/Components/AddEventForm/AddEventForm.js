import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./AddEventForm.scss";
import {useState} from "react";
import close from "../../assets/icons/close.svg"
import {useNavigate} from "react-router-dom";

export default function AddEventForm() {
    const [value, setValue] = React.useState(dayjs())
    const navigate = useNavigate();


    const handleCancel = (event) => {
        event.preventDefault();
        window.location.reload();
        // navigate("/my-calendar")

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // want to make a post request that sends this data and add it on to the table 
        console.log(value);
       }


    return (
        <div className="add-event">
            <div className="add-event__container--background">
                <article className="add-event__container">
                    <div className="add-event__container--header">
                        <a href="/my-calendar" className="add-event__close"><img src={close} alt="X symbol to close"/></a>
                        <h1 className="add-event__header">Add Event</h1>
                    </div>
                    <div className="add-event__container--content">
                        <h2 className="add-event__label">Event Name</h2>
                        <input type="text" name="event_name" className="add-event__input"></input>

                        <h2 className="add-event__label">Description</h2>
                        <input type="text" name="event_description" className="add-event__input"></input>

                        <h2 className="add-event__label add-event__label--date">Date:</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="add-event__date">
                            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                        </LocalizationProvider>

                        <h2 className="add-event__label add-event__label--category">Category:</h2>
                        <input type="text" name="event_category" className="add-event__input"></input>
                    </div>

                    <div className="add-event__container--button">
                        <button onClick={handleCancel} className="add-event__button">Cancel</button>
                        <button onClick={handleSubmit} className="add-event__button">Update Schedule</button>
                    </div>

                
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider> */}
                </article>
            </div>
        </div>
    );
}