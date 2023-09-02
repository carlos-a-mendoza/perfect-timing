import "./EventList.scss";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import axios from "axios";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"


function EventList(){

    // const {id} = useParams();
    const [allEvents, setAllEvents] = useState([]);

    useEffect(()=>{
        axios
            // .get(`http://localhost:8080/users/${id}`)
            .get(`http://localhost:8080/users/1`)
            .then((response)=>{
                setAllEvents(response.data);
                console.log(response.data);
            })
            .catch((error)=>{
                console.error(error);
            });
    }, []);

    //Filter events that have passed

    const upcomingEvents = (event) => {
        const eventDate = new Date(event.event_date);
        const currentDay = new Date();
        return eventDate >= currentDay;
    }

    const onlyUpcomingEvents = allEvents.filter(upcomingEvents)

    console.log(onlyUpcomingEvents)

    return(
        <div className="events-page">
            <h1 className="events-page__header" id="events">All Events</h1>
            <article className="events-page__container"> 
                <p className="events-page__heading">Event Date</p>
                <p className="events-page__heading">Event Name</p>
                <p className="events-page__heading events-page__heading--description">Event Description</p>
            </article>
            
            {onlyUpcomingEvents.map((event)=>{
                return(
                    <article key={event.id} className="events-page__wrapper">
                        <p className="events-page__context events-page__context--date">{event.event_date.split("T")[0]}</p>
                        <p className="events-page__context">{event.event_name}</p>
                        <p className="events-page__context events-page__context--description">{event.event_description}</p>
                        <div className="events-page__wrapper events-page__wrapper--icons">
                            <img src={editIcon} alt="pencil edit icon" className="events-page__icon"/>
                            <img src={deleteIcon} alt="delete icon" className="events-page__icon events-page__icon--delete"/>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default EventList;