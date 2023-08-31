import "./WeekCalendar.scss";
import {useState} from 'react';

function WeekCalendar() {
    const [currentDate] = useState(new Date());
  
    // const startDate = new Date(currentDate);
    // startDate.setDate(currentDate.getDate() -3);
  
  const weekOverview = [];

  for(let i=0; i<11; i++ ){
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() -4 + i);

    weekOverview.push(
      <div key={i} className="dayofthemonth">
        {date.getDate()}
      </div>
    )
  }
  
    return (
        <div className="week-calendar">
          {weekOverview}
        </div>
      );
    }

export default WeekCalendar;