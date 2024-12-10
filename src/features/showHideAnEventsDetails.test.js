/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import Event from "../components/Event";

const feature = loadFeature("./src/features/showHideEventsDetails.feature");

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;

    given("user is on the app", async () => {
      AppComponent = render(<App />);
      // eslint-disable-next-line testing-library/no-node-access
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
      });
    });

    when("the event list is displayed", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then("the event details should be collapsed by default", () => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      EventListItems.forEach((item) => {
        expect(item.querySelector(".event-details")).not.toBeInTheDocument();
      });
    });
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;

    given("a user is viewing an event in the list", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");

      // Wait for events to be rendered in the DOM
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    when("the user clicks the Show Details button", async () => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");

      // Simulate user clicking "Show Details" on the first event item
      const showDetailsButton = within(EventListItems[0]).getByRole("button", { name: "Show Details" });
      userEvent.click(showDetailsButton);

      // Wait for the event details to be shown
      await waitFor(() => {
        expect(EventListItems[0].querySelector(".event-details")).toBeInTheDocument();
      });
    });

    then("the event details should be expanded and displayed", () => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems[0].querySelector(".event-details")).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details.", ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;

    given("a user has expanded an event to see details", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");

      // Wait for events to be rendered
      await waitFor(() => {
        expect(EventListDOM).toBeInTheDocument();
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });

      // Expand the first event's details
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      const showDetailsButton = within(EventListItems[0]).getByRole("button", { name: "Show Details" });
      userEvent.click(showDetailsButton);

      // Wait for the details to be shown
      await waitFor(() => {
        expect(EventListItems[0].querySelector(".event-details")).toBeInTheDocument();
      });
    });

    when("the user clicks the Show Details button", async () => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      const hideDetailsButton = within(EventListItems[0]).getByRole("button", { name: "Hide Details" });
      userEvent.click(hideDetailsButton);

      // Wait for the details to be hidden
      await waitFor(() => {
        expect(EventListItems[0].querySelector(".event-details")).not.toBeInTheDocument();
      });
    });

    then("the event details should be collapsed and hidden", () => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems[0].querySelector(".event-details")).not.toBeInTheDocument();
    });
  });
});