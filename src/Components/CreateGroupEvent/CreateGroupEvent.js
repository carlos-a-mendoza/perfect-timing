import dayjs from 'dayjs';
import "./CreateGroupEvent.scss";
import {useState, useEffect} from "react";
import close from "../../assets/icons/close.svg"
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Alert from "../Alert/Alert";

export default function CreateGroupEvent() {

    const [value, setValue] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventCategory, setEventCategory] = useState("");
    const [groupMembersWithEvents, setGroupMembersWithEvents] = useState([]);
    const [daysWithoutEvents, setDaysWithoutEvents] = useState([]);
    const [groupsInvolvedIn, setGroupsInvolvedIn] = useState([])
    const [group, setGroup] = useState("")
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    console.log(groupMembersWithEvents)
    console.log(value)
    

    function isSameDay(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    useEffect(() => {
        axios.get('http://localhost:8080/users/usersingroup/friends')
        .then((response) => {
            const formattedData = response.data.map((user) => {
                const eventsWithFormattedDates = user.events.map((event) => {
                    const formattedDate = new Date(event.event_date);
                    return { ...event, event_date: formattedDate };
                });
                return { ...user, events: eventsWithFormattedDates };
            });
            setGroupMembersWithEvents(formattedData);
        })
        .catch((error) => {
            console.error('Error: Unable to obtain group members with events', error);
        });
    }, []);

    useEffect(() => {
        if (groupMembersWithEvents.length === 0) {
            return; // Return if data not available 
        }

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const allDaysInMonth = [];
        for (let day = 1; day <= daysInMonth; day++) {
            allDaysInMonth.push(new Date(year, month, day));
        }
    
        groupMembersWithEvents.forEach((user) => {
            user.events.forEach((event) => {
                const eventDate = new Date(event.event_date);
                const index = allDaysInMonth.findIndex((day) => isSameDay(day, eventDate));
                if (index !== -1) {
                    allDaysInMonth.splice(index, 1); 
                }
            });
        });
    
        setDaysWithoutEvents(allDaysInMonth);
    }, [groupMembersWithEvents]);

    useEffect(() =>{
        axios.get("http://localhost:8080/users/groups/1")
        .then((response)=>{
            setGroupsInvolvedIn(response.data)
        })
    },[])

    console.log(groupsInvolvedIn)

    console.log(daysWithoutEvents)

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
        navigate("/my-calendar");
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
            console.log(newEvent)

            axios
                .post("http://localhost:8080/", newEvent)
                .then((response) =>{
                    if(response.status === 201)
                    setTimeout(()=>{navigate(`/my-calendar`)}, 2000);
                     return;
                })
                .catch((error)=>{
                    console.error("Error: Event cannot be created", error)
                    setMessage("Error: Event Was Not Added")
                })
            
            return navigate("/my-calendar");
        } else {
            setMessage("Failed to upload. All fields required. Please correct errors.")
        }
       }
    
    const handleChangeGroup = (event) =>{
        event.preventDefault();
        setGroup(event.target.value)
    }

    const handleValue=(event) =>{
        event.preventDefault();
        const date = dayjs(event.target.value).toDate()
        console.log(date)
        setValue(date)
    }

    return (
        <div className="add-event">
            <Alert message={message} setMessage={setMessage}/>
            <div className="add-event__container--background">
                <article className="add-event__container">
                    <div className="add-event__container--header">
                        <a href="/my-calendar" className="add-event__close"><img src={close} alt="X symbol to close"/></a>
                        <h1 className="add-event__header">Create Group Event</h1>
                    </div>
                    <div className="add-event__container--content">
                        <div>
                            <h2 className="add-event__label">Group Select:</h2>
                            <select name="group" className="add-event__input" onChange={handleChangeGroup} defaultValue="Best Friends">
                                {groupsInvolvedIn.map((group, index) =>{
                                    return <option key={index} value={group.group_name}>{group.group_name}</option>
                                })}
                            </select>
                            {/* <input type="text" name="event_group" className="add-event__input" onChange={handleEventName} value="Best Friends"></input> */}
                        </div>
    
                        <div>
                            <h2 className="add-event__label">Days Your Group Are Available:</h2>
                            <div className="add-event__wrapper">

                            <select name="event_date" className="add-event__input" onChange={handleValue}>
                            
                                    {daysWithoutEvents.map((day, index)=>{
                                        const date = new Date(day);
                                        const dateFormat ={
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }

                                        const fullDate = date.toLocaleDateString(undefined, dateFormat)
                                    return(
                                            <option className="add-event__date-available" key={index}>{fullDate}</option>
                                    )
                                    })}
                            </select>
                            </div>
                        </div>

                        <h2 className="add-event__label">Event Name:</h2>
                        <input type="text" name="event_name" className="add-event__input" onChange={handleEventName} value={eventName}></input>

                        <h2 className="add-event__label">Description:</h2>
                        <input type="text" name="event_description" className="add-event__input" onChange={handleEventDescription} value={eventDescription}></input>


                        <h2 className="add-event__label add-event__label--category">Category:</h2>
                        <input type="text" name="event_category" className="add-event__input" onChange={handleEventCategory} value={eventCategory}></input>
                    </div>

                    <div className="add-event__container--button">
                        <button onClick={handleCancel} className="add-event__button">Cancel</button>
                        <button onClick={handleSubmit} className="add-event__button">Create Event</button>
                    </div>
                </article>
            </div>
        </div>
    );
}