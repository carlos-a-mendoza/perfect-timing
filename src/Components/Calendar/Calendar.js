import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "./Calendar.scss";

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker orientation="portrait" />
    </LocalizationProvider>
  );
}