// src/__tests__/App.test.js

import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('renders CitySearch', async () => {
    const { findByTestId } = render(<App />);
    const citySearchElement = await findByTestId('city-search');
    expect(citySearchElement).toBeInTheDocument();
  });

  test('renders NumberOfEvents', async () => {
    const { findByTestId } = render(<App />);
    const numberOfEventsElement = await findByTestId('number-of-events');
    expect(numberOfEventsElement).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const AppDOM = container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    
    // Wait for the event list to be updated
    await waitFor(() => {
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toBeGreaterThan(0);  // or specific length based on your event filter
    });

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
    
    // Re-fetch and check against the filtered events
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('updates the number of events displayed when the user changes the number of events input', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const AppDOM = container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByTestId('numberOfEventsInput');

    await user.clear(NumberOfEventsInput);
    await user.type(NumberOfEventsInput, '10');  // Adjust the number of events

    // Wait for the event list to be updated
    await waitFor(() => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toBe(10);
    });
  });
});
