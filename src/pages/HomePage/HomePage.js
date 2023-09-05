import "./HomePage.scss";
import WeekCalendar from "../../Components/WeekCalendar/WeekCalendar";
import axios from "axios";
import {useEffect, useState} from "react";
import PeopleYouMayKnow from "../../Components/PeopleYouMayKnow/PeopleYouMayKnow";
import Header from "../../Components/Header/Header";

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

    console.log(onlyUpcomingEvents)

   function dateConversion (event){
    const eventDate = new Date(event.event_date)
    const formatDate = {
        year: "numeric", 
        month: "long",
        day: "numeric",
    }
    const fullDate = eventDate.toLocaleDateString(undefined, formatDate);
    return fullDate;
    }


    return(

        <>
        <Header/>
        <div className="home">
            
            <h1 className="home__header">Good Day User!</h1>
            <div className="home__container">
                <WeekCalendar/>
            </div>
            
            <h2 className="home__subheading">Upcoming Events </h2>
                <div className="home__container-content">
                    <div className="home__container--events home__container--left">
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">1.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[0])}</span> : {onlyUpcomingEvents[0].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[0].event_description}</p>
                        </div>
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">2.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[1])}</span> : {onlyUpcomingEvents[1].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[1].event_description}</p>
                        </div>
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">3.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[2])}</span> : {onlyUpcomingEvents[2].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[2].event_description}</p>
                        </div>
                    </div>
                    <div className="home__container--events">
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">4.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[3])}</span> : {onlyUpcomingEvents[3].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[3].event_description}</p>
                        </div>
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">5.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[4])}</span> : {onlyUpcomingEvents[4].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[4].event_description}</p>
                        </div>
                        <div className="home__event">
                            <p className="home__event-name"><span className="home__event-number">6.</span><span className="home__event-date">{dateConversion(onlyUpcomingEvents[5])}</span> : {onlyUpcomingEvents[5].event_name}</p>
                            <p className="home__event-description">{onlyUpcomingEvents[5].event_description}</p>
                        </div>
                    </div>    
                </div>    
            <PeopleYouMayKnow/>
        </div>
        </>
    )
};

export default HomePage;

