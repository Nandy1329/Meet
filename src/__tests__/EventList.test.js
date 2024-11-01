import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('renders correctly when events are provided', () => {
    const events = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ];
    const { getByText } = render(<EventList events={events} />);
    expect(getByText('Event 1')).toBeInTheDocument();
    expect(getByText('Event 2')).toBeInTheDocument();
  });

  test('renders "No events available" when events is an empty array', () => {
    const { getByText } = render(<EventList events={[]} />);
    expect(getByText('No events available')).toBeInTheDocument();
  });

  test('renders "No events available" when events is null', () => {
    const { getByText } = render(<EventList events={null} />);
    expect(getByText('No events available')).toBeInTheDocument();
  });
});