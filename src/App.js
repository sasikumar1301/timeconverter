import React, { useState } from 'react';
import './App.css';
import { FaTimes } from 'react-icons/fa'; // Import the cross mark icon

const App = () => {
  const defaultIstTime = new Date();
  defaultIstTime.setHours(5);
  defaultIstTime.setMinutes(30);
  defaultIstTime.setSeconds(0);

  const defaultUstTime = new Date();
  defaultUstTime.setUTCHours(0);
  defaultUstTime.setUTCMinutes(0);
  defaultUstTime.setUTCSeconds(0);

  const [times, setTimes] = useState([
    { id: 'Ist', time: defaultIstTime, visible: true },
    { id: 'ust', time: defaultUstTime, visible: true }
  ]);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculateProgress = (time, id) => {
    if (id === 'ust' && time.getTime() === defaultUstTime.getTime()) {
      return 0; // Return 0 for default UST time
    }
    const totalSecondsInDay = 24 * 60 * 60;
    const totalSecondsPassed = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
    return (totalSecondsPassed / totalSecondsInDay) * 100;
  };

  const handleTimeChange = (id, event) => {
    const percentage = parseInt(event.target.value);
    const totalSecondsInDay = 24 * 60 * 60;
    const totalSeconds = (percentage / 100) * totalSecondsInDay;
    const newTime = new Date(times.find(t => t.id === id).time);
    newTime.setHours(Math.floor(totalSeconds / 3600));
    newTime.setMinutes(Math.floor((totalSeconds % 3600) / 60));
    newTime.setSeconds(Math.floor(totalSeconds % 60));

    const updatedTimes = times.map(t => {
      if (t.id === id) {
        return { ...t, time: newTime };
      } else if (t.id === 'Ist') {
        const ustOffset = 5.5;
        const IstTime = new Date(newTime.getTime() + ustOffset * 60 * 60 * 1000);
        return { ...t, time: IstTime };
      } else if (t.id === 'ust') {
        const ustOffset = 5.5;
        const ustTime = new Date(newTime.getTime() - ustOffset * 60 * 60 * 1000);
        return { ...t, time: ustTime };
      }
      return t;
    });
    setTimes(updatedTimes);
  };

  const handleContainerRemove = (id) => {
    setTimes(times.map(t => t.id === id ? { ...t, visible: false } : t));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, id) => {
    const draggedId = e.dataTransfer.getData('id');
    const draggedItem = times.find(t => t.id === draggedId);
    const droppedIndex = times.findIndex(t => t.id === id);
    const updatedTimes = [...times];
    updatedTimes.splice(droppedIndex, 0, updatedTimes.splice(times.findIndex(t => t.id === draggedId), 1)[0]);
    setTimes(updatedTimes);

    console.log(draggedItem)
  };

  return (
    <>
      <h1 className='head'>TIME CONVERTER</h1>
      {times.map(({ id, time, visible }, index) => (
        visible && (
          <div
            key={id}
            className="container"
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, id)}
          >
            <div
              className="slider-container"
            >
              <p className='timep'>{id.toUpperCase()} Time: {formatTime(time)}</p>
              <FaTimes
                className="close-icon"
                onClick={() => handleContainerRemove(id)}
              />
              <input
                className="slider"
                type="range"
                min="0"
                max="100"
                value={calculateProgress(time, id)}
                onChange={(event) => handleTimeChange(id, event)}
              />
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default App;
