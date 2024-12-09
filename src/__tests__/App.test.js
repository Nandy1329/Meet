import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders NumberOfEvents', async () => {
  const { findByTestId } = render(<App />);

  await waitFor(() => {
    const numberOfEventsElement = findByTestId('number-of-events');
    expect(numberOfEventsElement).toBeInTheDocument();
  });
});

test('renders a list of events matching the city selected by the user', async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();

  const CitySearchDOM = container.querySelector('#city-search');
  expect(CitySearchDOM).not.toBeNull();

  const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
  expect(CitySearchInput).not.toBeNull();

  await user.type(CitySearchInput, 'Berlin');

  const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
  await user.click(berlinSuggestionItem);

  const EventListDOM = container.querySelector('.event-list');
  await waitFor(() => {
    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
    expect(EventListItems.length).toBeGreaterThan(0);

    const allEventsMatchCity = EventListItems.every((event) =>
      event.textContent.includes('Berlin')
    );
    expect(allEventsMatchCity).toBe(true);
  });
});

test('updates the number of events displayed when the user changes the input', async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();

  const NumberOfEventsDOM = container.querySelector('#number-of-events');
  expect(NumberOfEventsDOM).not.toBeNull();

  const NumberOfEventsInput = within(NumberOfEventsDOM).queryByTestId('number-of-events');
  await user.clear(NumberOfEventsInput);
  await user.type(NumberOfEventsInput, '10');

  const EventListDOM = container.querySelector('.event-list');
  await waitFor(() => {
    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
    expect(EventListItems.length).toBe(10);
  });
});
