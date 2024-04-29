// src/TimezoneConverter.jsx
import React, { useState } from 'react';
import moment from 'moment-timezone'; // Assuming you're using moment-timezone
 // Assuming you're using moment-timezone

const TimezoneConverter = () => {
  const [userInputTime, setUserInputTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [targetTimezone, setTargetTimezone] = useState('Asia/Kolkata'); // Default to IST

  const handleUserInputTime = (event) => {
    setUserInputTime(event.target.value);
  };

  const handleConvertTimezone = () => {
    if (!userInputTime) {
      alert('Please enter a time.');
      return;
    }

    const converted = moment(userInputTime).tz(targetTimezone);
    setConvertedTime(converted.format('h:mm a')); // Adjust format as needed
  };

  return (
    <div className="timezone-converter">
      <h2>Timezone Converter</h2>
      <input
        type="text"
        placeholder="Enter time (e.g., 10:30 AM)"
        value={userInputTime}
        onChange={handleUserInputTime}
      />
      <select value={targetTimezone} onChange={(event) => setTargetTimezone(event.target.value)}>
        <option value="UTC">UTC</option>
        <option value="Asia/Kolkata">IST (India Standard Time)</option>
        {/* Add more options for other timezones */}
      </select>
      <button onClick={handleConvertTimezone}>
        Convert to {targetTimezone === 'Asia/Kolkata' ? 'IST' : targetTimezone}
      </button>
      {convertedTime && <p>Converted Time: {convertedTime}</p>}

      {targetTimezone === 'Asia/Kolkata' && ( // Display UTC comparison if IST is selected
        <p>
          Comparison to UTC: {moment(userInputTime).format('h:mm a')} (UTC)
        </p>
      )}
    </div>
  );
};

export default TimezoneConverter;