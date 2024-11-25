import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="event">
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && <p className="eventDetails">{event.details}</p>}
        </div>
    );
};

export default Event;