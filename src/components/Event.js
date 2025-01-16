import React, { useState } from "react";

// Define the formatDate function
const formatDate = (dateTime) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTime).toLocaleDateString(undefined, options);
};


const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <li>
      <div className="event">
        <h2>{event.summary || "Event Title Not Available"}</h2>
        <p><strong>{event.start?.dateTime ? formatDate(event.start.dateTime) : "Date not available"}</strong></p>
        <p>{event.location || "Location not specified"}</p>

        {showDetails && (
          <div className="event-details">
            {event.description && (
              <p>{event.description}</p>
            )}
            <button className="btn-to-calendar">
              <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="link-to-calendar">
                See on Google Calendar
              </a>
            </button>
          </div>
        )}

        <button
          className="show-details-btn"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </li>
  );
};
export default Event;