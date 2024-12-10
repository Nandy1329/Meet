import PropTypes from 'prop-types';
import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list" role="list" aria-label="event list">
      {events && events.length > 0 ?
        events.map(event => <Event key={event.id} event={event} />) :
        <li>No events available</li>
      }
    </ul>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventList;