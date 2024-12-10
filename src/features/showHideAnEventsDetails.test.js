import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;

        given('the user hasn’t searched for any city', () => {
            // No action needed as the user hasn't searched for any city
        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see the list of all upcoming events', async () => {
            const EventListDOM = AppComponent.getByRole('list', { name: /event list/i });

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('the event details should be hidden by default', () => {
            const eventDetails = AppComponent.queryByText(/details/i);
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppComponent;

        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the user clicks on the “show details” button for an event', async () => {
            const user = userEvent.setup();
            const showDetailsButton = AppComponent.getByText('Show Details');
            await user.click(showDetailsButton);
        });

        then('the event details should be displayed', () => {
            const eventDetails = AppComponent.queryByText(/details/i);
            expect(eventDetails).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppComponent;

        given('the event details are displayed', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            const showDetailsButton = AppComponent.getByText('Show Details');
            await user.click(showDetailsButton);
        });

        when('the user clicks on the “hide details” button for an event', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = AppComponent.getByText('Hide Details');
            await user.click(hideDetailsButton);
        });

        then('the event details should be hidden', () => {
            const eventDetails = AppComponent.queryByText(/details/i);
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
});