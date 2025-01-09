import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import { extractLocations, getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const handleNumberOfEventsChange = (number) => {
    setCurrentNOE(number);
  };
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents();
        setErrorAlert(""); // Clear previous error alerts
        const filteredEvents =
          currentCity === "See all cities"
            ? allEvents
            : allEvents.filter((event) => event.location === currentCity);

        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error(error);
        setErrorAlert("Error fetching events. Please try again later.");
      }
    };

    if (navigator.onLine) {
      setWarningAlert(""); // Clear offline warning
    } else {
      setWarningAlert("You are offline. Events may not be up-to-date.");
    }
    fetchData();
    if (navigator.onLine) {
      setWarningAlert(""); // Clear offline warning
    } else {
      setWarningAlert("You are offline. Events may not be up-to-date.");
    }
  }, [currentCity, currentNOE]);

 return (
  <div className="App">
  <div className="alerts-container">
      {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
    </div>
  
  <CitySearch 
    allLocations={allLocations} 
    setCurrentCity={setCurrentCity} 
  />
  <NumberOfEvents 
      numberOfEvents={currentNOE} 
      onNumberOfEventsChange={handleNumberOfEventsChange} 
      setErrorAlert={setErrorAlert}
    />
      onNumberOfEventsChange={handleNumberOfEventsChange} 
      setErrorAlert={setErrorAlert}
/>
  <EventList events={ events }/>
 </div>
);
}

export default App;