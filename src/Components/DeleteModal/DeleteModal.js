import "./DeleteModal.scss";
import {useState, useEffect} from "react";
import close from "../../assets/icons/close.svg"
import axios from 'axios';

export default function DeleteModal({eventId, eventInfo}) {
    
    const [selectedEvent, setSelectedEvent] = useState(null)


    useEffect(()=>{
        const detailOfEventBeingDeleted = eventInfo.find((deletedEvent)=>deletedEvent.id === eventId)
        setSelectedEvent(detailOfEventBeingDeleted);
    }, [eventId, eventInfo])

    const handleDelete = (event) =>{
        axios
            .delete(`http://localhost:8080/${eventId}`)
            .then((response)=>{
                if(response.status === 204){
                    setTimeout(()=>{
                        window.location.reload();
                    },100);
                }
            });
    };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.reload();
      }

    if(!selectedEvent){
        return <p>Loading...</p>
    }

    return (
        <div className="delete">
        <div className="delete__transparent-container">
          <div className="delete__main-container">
            
            <div className="delete__wrapper">
              <div className="delete__subcontainer">
              <a href="/" onClick={handleCancel}><img src={close} alt="X symbol/Exit feature to close pop-up window" className="delete__icon-close"/></a>
            </div>
              <h1 className="delete__heading"> Delete {selectedEvent.event_name} event? </h1>
              <p className="delete__text">
                Would you like to delete this event?
              </p>
            </div>  
            <div className="delete__container">
              <button onClick={handleCancel} className="delete__button">Cancel</button>
              <button onClick={handleDelete} className="delete__button delete__button--delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
}