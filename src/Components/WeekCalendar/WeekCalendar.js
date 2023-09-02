import "./WeekCalendar.scss";
import {useState} from 'react';

function WeekCalendar() {
    const [currentDate] = useState(new Date());

  
  //we want to highlight or indicate today's date
  //when clicked it will bring the user to the my Calendar page
  
  const weekOverview = [];

  for(let i=0; i<11; i++ ){
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() -4 + i);

    const dateToday = date.toDateString() === currentDate.toDateString();

    const checkDateIfToday = dateToday ? "week-calendar__day week-calendar__day--today" : "week-calendar__day";

    weekOverview.push(
      <div key={i} className={checkDateIfToday}>
          <div>
            <a href="/my-calendar">{date.getDate()}</a>
          </div> 
      </div>
    )
  }

  console.log(currentDate)
  
    return (
        <div className="week-calendar">
          {weekOverview}
        </div>
      );
    }

export default WeekCalendar;