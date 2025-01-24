import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
    test("When user hasn’t specified a number, 32 events are shown by default.", ({ given, when, then }) => {

        let AppComponent;
        given("the user has not specified a number of events to display", () => {
            AppComponent = render(<App />);
        });

        when("the event list is loaded", () => {
        });

        then("32 events should be displayed by default", async () => {
            const input = screen.getByRole('spinbutton');
            expect(input).toHaveValue(32);
        });
    });

    test("User can change the number of events displayed.", ({ given, when, then }) => {

        let AppComponent;
        given("the user is viewing the event list", () => {
            AppComponent = render(<App />);
        });

        when("the user changes the number of events to display to 10", async () => {
            // Access the spinbutton input field
            const input = screen.getByRole('spinbutton');
            const user = userEvent.setup();

            // Simulate user typing '10'
            await user.clear(input);
            await user.type(input, '10');
        });

        then("the event list should display 10 events", async () => {
            // Check if the input value has been updated to 10
            const input = screen.getByRole('spinbutton');
            expect(input).toHaveValue(10);
        });
    });
});