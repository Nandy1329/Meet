/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

const event = mockData[0];

describe('<Event /> component', () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });

    test('renders event title', () => {
        const eventTitle = EventComponent.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

  test("render event created date", () => {
    const eventCreated = EventComponent.queryByText(event.created);
    expect(eventCreated).toBeInTheDocument();
  });

    test('renders event location', () => {
        const eventLocation = EventComponent.queryByText(event.location);
        expect(eventLocation).toBeInTheDocument();
    });

    // Show Details button
    test('render event details button', () => {
        const detailButton = EventComponent.queryByText('Show Details');
        expect(detailButton).toBeInTheDocument();
    });

    // Scenario 1
    test("event's details are hidden by default", () => {
        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Scenario 2
    test('show details after user clicks on button "Show Details"', async () => {
        const user = userEvent.setup();

        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
    });

    // Scenario 3
    test('hide details after user clicks on button "Hide Details"', async () => {
        const user = userEvent.setup();

        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const hideDetailButton = EventComponent.queryByText('Hide Details');
        await user.click(hideDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });
}); 