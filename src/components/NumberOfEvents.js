import PropTypes from 'prop-types';

const NumberOfEvents = ({ onNumberOfEventsChange, setErrorAlert }) => {
  const handleButtonClick = (number) => {
    if (number <= 0 || number > 100) {
      setErrorAlert("Please enter a valid number of events (between 1 and 100).");
    } else {
      setErrorAlert("");
      onNumberOfEventsChange(number);
    }
  };

  return (
    <div className="events-number-buttons">
      <button className="number-button" onClick={() => handleButtonClick(5)}>5 events</button>
      <button className="number-button" onClick={() => handleButtonClick(10)}>10 events</button>
      <button className="number-button" onClick={() => handleButtonClick(20)}>20 events</button>
      <button className="number-button" onClick={() => handleButtonClick(32)}>32 events</button>
    </div>
  );
};

NumberOfEvents.propTypes = {
  onNumberOfEventsChange: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;