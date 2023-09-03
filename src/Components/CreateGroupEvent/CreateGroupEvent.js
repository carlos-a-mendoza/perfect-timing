import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./CreateGroupEvent.scss";
import {useState} from "react";
import close from "../../assets/icons/close.svg"
import {useNavigate} from "react-router-dom";
import { urlAllEventsByUser } from '../../utils/api-utils';
import axios from 'axios';

export default function CreateGroupEvent() {
    const [value, setValue] = React.useState(dayjs())
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventCategory, setEventCategory] = useState("");

    const navigate = useNavigate();

    const handleEventName = (event) =>{
        setEventName(event.target.value)
    };

    const handleEventDescription = (event) =>{
        setEventDescription(event.target.value)
    };

    const handleEventCategory = (event)=>{
        setEventCategory(event.target.value)
    };

    const isFormValid = () => {
        if (!eventName || !eventDescription || !eventCategory){
            return false;
        }

        return true;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.reload();
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        if (isFormValid()){
            const newEvent ={
                event_name: eventName,
                event_description: eventDescription,
                event_date: value,
                event_category: eventCategory,
                user_id: 1,
            }

            axios
                .post("http://localhost:8080/", newEvent)
                .then((response) =>{
                    if(response.status === 201)
                    setTimeout(()=>{navigate(`/my-calendar`)}, 2000);
                     return;
                })
                .catch((error)=>{
                    console.error("Error: Event cannot be created", error)
                    alert("Error: Event Was Not Added")
                })
            
            return window.location.reload();
        } else {
            alert("Failed to upload. All fields required. Please correct errors.")
        }
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
                        <h2 className="add-event__label">Event Name:</h2>
                        <input type="text" name="event_name" className="add-event__input" onChange={handleEventName} value={eventName}></input>

                        <h2 className="add-event__label">Description:</h2>
                        <input type="text" name="event_description" className="add-event__input" onChange={handleEventDescription} value={eventDescription}></input>

                        <h2 className="add-event__label add-event__label--date">Date:</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="add-event__date">
                            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                        </LocalizationProvider>

                        <h2 className="add-event__label add-event__label--category">Category:</h2>
                        <input type="text" name="event_category" className="add-event__input" onChange={handleEventCategory} value={eventCategory}></input>
                    </div>

                    <div className="add-event__container--button">
                        <button onClick={handleCancel} className="add-event__button">Cancel</button>
                        <button onClick={handleSubmit} className="add-event__button">Update Schedule</button>
                    </div>
                </article>
            </div>
        </div>
    );
}