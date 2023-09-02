import AddEventForm from "../../Components/AddEventForm/AddEventForm";
import Calendar from "../../Components/Calendar/Calendar";
import "./HomePage.scss";
import WeekCalendar from "../../Components/WeekCalendar/WeekCalendar";
import UserCards from "../../Components/PeopleYouMayKnow/PeopleYouMayKnow";
import axios from "axios";
import {useEffect, useState} from "react";
import PeopleYouMayKnow from "../../Components/PeopleYouMayKnow/PeopleYouMayKnow";

function HomePage(){

    const [allEvents, setAllEvents] = useState(null);

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

    const upcomingEvents = (event) => {
        const eventDate = new Date(event.event_date);
        const currentDay = new Date();
        return eventDate >= currentDay;
    }

    if(allEvents === null){
        return <p>Loading...</p>
    }

    const onlyUpcomingEvents = allEvents.filter(upcomingEvents)

    return(
        <div className="home">
            <h1 className="home__header">Good Day User!</h1>
            <div className="home__container">
                <WeekCalendar/>
            </div>
            
            <h2 className="home__subheading">Upcoming Events </h2>

            <div className="home__event">
                <p className="home__event-name"><span className="home__event-number">1.</span>{onlyUpcomingEvents[0].event_name}</p>
                <p className="home__event-description">{onlyUpcomingEvents[0].event_description}</p>
            </div>
            <div className="home__event">
                <p className="home__event-name"><span className="home__event-number">2.</span>{onlyUpcomingEvents[1].event_name}</p>
                <p className="home__event-description">{onlyUpcomingEvents[1].event_description}</p>
            </div>
            <div className="home__event">
                <p className="home__event-name"><span className="home__event-number">3.</span>{onlyUpcomingEvents[2].event_name}</p>
                <p className="home__event-description">{onlyUpcomingEvents[2].event_description}</p>
            </div>
            <PeopleYouMayKnow/>


        </div>
    )
};

export default HomePage;

