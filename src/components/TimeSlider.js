import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeSlider = ({ label, timezone, onTimeChange }) => {
  const [time, setTime] = useState(moment().tz(timezone).format('HH:mm')); // Use 24-hour format for sliders

  useEffect(() => {
    const updateTime = () => {
      setTime(moment().tz(timezone).format('HH:mm'));
    };

    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timezone]);

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10); // Convert to integer for validation
    if (newTime >= 0 && newTime <= 2359) { // Validate between 00:00 and 23:59
      const formattedTime = moment(newTime.toString(), 'HHmm').tz(timezone).format('HH:mm');
      setTime(formattedTime);
      onTimeChange(moment(formattedTime, 'HH:mm').tz(timezone)); // Pass the converted time back to parent
    }
  };

  return (
    <div className="time-slider">
      <label htmlFor={`time-${timezone}`}>{label} Time:</label>
      <input
        type="range"
        id={`time-${timezone}`}
        min="0"
        max="2359"
        step="1" // Allow single minute increments
        value={time.replace(':', '')} // Remove colon for slider value
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimeSlider;
