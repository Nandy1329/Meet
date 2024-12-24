// src/App.js
import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { InfoAlert, ErrorAlert } from "./components/Alert";
import { extractLocations, getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // Re-fetch when city or number of events changes

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);

      setEvents(filteredEvents.slice(0, currentNOE)); // Slice based on the current number of events
      setAllLocations(extractLocations(allEvents)); // Update locations for CitySearch
    } catch (error) {
      setErrorAlert("Error fetching events. Please try again later.");
    }
  };

  return (
    <div className="App">

      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />

      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />

      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;