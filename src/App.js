import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      if (!allEvents) {
        throw new Error('No events found');
      }
      const filteredEvents = currentCity === "See all cities"
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);

      setEvents(filteredEvents.slice(0, currentNOE)); // Slice based on the current number of events
      setAllLocations(extractLocations(allEvents)); // Update locations for CitySearch
    } catch (error) {
      setErrorAlert('Error fetching events. Please try again later.');
    }
  };

  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity} />
      {errorAlert && <div className="error-alert">{errorAlert}</div>} {/* Show error message if there's one */}
      <EventList events={events} />
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE} />
    </div>
  );
};

export default App;