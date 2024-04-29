import React, { useState } from 'react';
import TimeSlider from './TimeSlider';
import moment from 'moment-timezone';

const UtcIstConverter = () => {
  const [utcTime, setUtcTime] = useState(moment.utc().format('HH:mm'));
  const [istTime, setIstTime] = useState(moment.utc().tz('Asia/Kolkata').format('HH:mm'));

  const handleTimeChange = (newTime, targetTimezone) => {
    if (targetTimezone === 'utc') {
      setUtcTime(newTime.format('HH:mm'));
      setIstTime(newTime.clone().tz('Asia/Kolkata').format('HH:mm'));
    } else { // targetTimezone === 'Asia/Kolkata'
      setIstTime(newTime.format('HH:mm'));
      setUtcTime(newTime.clone().tz('utc').format('HH:mm'));
    }
  };

  return (
    <div className="utc-ist-converter">
      <h1>UTC - IST Time Converter</h1>
      <TimeSlider label="UTC" timezone="utc" onTimeChange={handleTimeChange} />
      <TimeSlider label="IST" timezone="Asia/Kolkata" onTimeChange={handleTimeChange} />
      <h2>Converted Time:</h2>
      <p>UTC: {utcTime}</p>
      <p>IST: {istTime}</p>
    </div>
  );
};

export default UtcIstConverter;
