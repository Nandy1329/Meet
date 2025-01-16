/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import React from 'react';
import { fireEvent } from '@testing-library/react';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test("When user hasn't specified a number, 35 is the default number", ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        let eventList;
        given(
            "the user hasn't specified or filtered the number of events",
            () => {
                AppComponent = render(<App />);
            }
        );

        when('the user sees the list of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        then(/^the default number of displayed events will be (\d+)$/, () => {
            expect(eventList.length).toEqual(35);
        });
    });

    test('User can change the number of events they want to see.', ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        let numberOfEventsInput;
        given('the user has events displayed', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
            numberOfEventsInput =
                within(AppDOM).getByLabelText('Number of Events');
        });

        when(
            'the user chooses to change the number of events displayed',
            async () => {
                fireEvent.change(numberOfEventsInput, {
                    target: { value: '10' },
                });
            }
        );

        then(
            'the number of events displayed will update to the number the user selected',
            () => {
                const AppDOM = AppComponent.container.firstChild;
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList.length).toEqual(35);
            }
        );
    });
});