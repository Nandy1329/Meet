import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import { ErrorAlert, InfoAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

const App = () => {
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [currentCity, setCurrentCity] = useState('See all cities'); //Ren: Maintain a state for City
	const [allLocations, setAllLocations] = useState([]);
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [warningAlert, setWarningAlert] = useState('');

	const fetchData = async () => {
		try {
			const allEvents = await getEvents();

			// Ren: Filter the events based on currentCity user's choice
			const filteredEvents =
				currentCity === 'See all cities'
					? allEvents
					: allEvents.filter(
						(event) => event.location === currentCity
					);

			setEvents(filteredEvents.slice(0, currentNOE));
			setAllLocations(extractLocations(allEvents));
		} catch (error) {
			console.error('Error fetching events. Please try again later.');
		}
	};

	useEffect(() => {
		if (!navigator.onLine) {
			// set the warning alert message to an empty string ""
			setWarningAlert(
				'App offline, last loaded events will be used for events'
			);
		} else {
			// set the warning alert message to a non-empty string
			setWarningAlert('');
		}
		fetchData();
	}, [currentCity, currentNOE]); // Ren: Watch for City or NOE state and call fetchData if they gets modified.

	useEffect(() => {
		getEvents().then((events) => {
			const locations = extractLocations(events);
			setAllLocations(locations);
			setEvents(events, currentNOE);
		});
	}, []);

	return (
		<div className="App">
			<h1>Meet App</h1>
			<h3>Choose your nearest city and number of events to see</h3>
			<div className="alerts-container">
				{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
				{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
				{warningAlert.length ? (
					<WarningAlert text={warningAlert} />
				) : null}
			</div>
			{/* Ren: Passing state setter method, so that CitySearch component can inform App component (see below) .. */}
			{/* Ren: that it has changed the city, so App can re-render the events list */}
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>

			<NumberOfEvents
				currentNOE={currentNOE}
				setCurrentNOE={setCurrentNOE}
				setErrorAlert={setErrorAlert}
			/>
			<div className="charts-container">
				<EventGenresChart events={events} />
				<CityEventsChart allLocations={allLocations} events={events} />
			</div>
			<EventList events={events} />
		</div>
	);
};

export default App;