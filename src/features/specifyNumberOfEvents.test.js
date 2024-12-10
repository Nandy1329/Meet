import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Default number of events is displayed', ({ given, when, then }) => {
        let AppComponent;

        given('the user has not specified a number of events', () => {
            // No action needed as the user has not specified the number of events
        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the app should display 32 events by default.', async () => {
            const eventList = await waitFor(() => within(document.body).getAllByRole('listitem'));
            expect(eventList).toHaveLength(32);
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;

        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the user specifies a number in the "number of events" input field', async () => {
            const input = within(document.body).getByLabelText('Number of Events:');
            await userEvent.clear(input);
            await userEvent.type(input, '10');
        });

        then('the app should update to show that number of events.', async () => {
            const eventList = await waitFor(() => within(document.body).getAllByRole('listitem'));
            expect(eventList).toHaveLength(10);
        });
    });

    test('User enters an invalid number of events', ({ given, when, then, and }) => {
        let AppComponent;

        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the user enters an invalid number (e.g., zero or negative)', async () => {
            const input = within(document.body).getByLabelText('Number of Events:');
            await userEvent.clear(input);
            await userEvent.type(input, '-1');
        });

        then('the app should display an error message "Please enter a valid number of events."', async () => {
            const errorMessage = await waitFor(() => within(document.body).getByText('Please enter a valid number of events.'));
            expect(errorMessage).toBeInTheDocument();
        });

        and('the app should continue displaying the previously selected number of events.', async () => {
            const eventList = await waitFor(() => within(document.body).getAllByRole('listitem'));
            expect(eventList).toHaveLength(32); // Assuming 32 was the previously selected number
        });
    });

    test('User clears the input field', ({ given, when, then }) => {
        let AppComponent;

        given('the user has specified a number of events', async () => {
            AppComponent = render(<App />);
            const input = within(document.body).getByLabelText('Number of Events:');
            await userEvent.clear(input);
            await userEvent.type(input, '10');
        });

        when('the user clears the "number of events" input field', async () => {
            const input = within(document.body).getByLabelText('Number of Events:');
            await userEvent.clear(input);
        });

        then('the app should display the default 32 events.', async () => {
            const eventList = await waitFor(() => within(document.body).getAllByRole('listitem'));
            expect(eventList).toHaveLength(32);
        });
    });
});