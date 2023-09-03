import React from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import FlareSharpIcon from '@mui/icons-material/FlareSharp';
import "./ServerDay.scss";

function ServerDay(props) {
    const {highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      overlap="circular"
      badgeContent={isSelected ? <FlareSharpIcon/> : undefined}
      className="badge"
    >

      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default ServerDay;




