// src/__tests__/Event.test.js
import React from "react";
import Event from "../components/Event";
import mockData from "../mock-data";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const event = mockData[0];

describe("<Event /> component", () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  // Render component elements
  test("render event title", () => {
    const eventTitle = EventComponent.queryByText(event.summary);
    expect(eventTitle).toBeInTheDocument();
  });

  test("render event created date", () => {
    const eventCreated = EventComponent.queryByText(event.created);
    expect(eventCreated).toBeInTheDocument();
  });

  test("render event location", () => {
    const eventLocation = EventComponent.queryByText(event.location);
    expect(eventLocation).toBeInTheDocument();
  });

  // Show Details btn
  test("render event details button", () => {
    const detailButton = EventComponent.queryByText("Show Details");
    expect(detailButton).toBeInTheDocument();
  });

  // Scenario 1
  test("event details are hidden by default", () => {
    const eventDetails = EventComponent.queryByText("About event:"); // Check if the event details heading is visible
    expect(eventDetails).not.toBeInTheDocument();
  });

  // Scenario 2
  test('shows event details when clicking "Show Details"', async () => {
    const user = userEvent.setup();

    const showDetailButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailButton);

    const eventDetailsDom = EventComponent.container.firstChild;
    const eventDetails = eventDetailsDom.querySelector(".event-details");
    expect(eventDetails).toBeInTheDocument();
  });

  // Scenario 3
  test('hide details when clicking on button "Hide details', async () => {
    const user = userEvent.setup();

    const showDetailButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailButton);

    const hideDetailButton = EventComponent.queryByText("Hide Details");
    await user.click(hideDetailButton);

    const eventDetailsDom = EventComponent.container.firstChild;
    const eventDetails = eventDetailsDom.querySelector(".eventDetails");
    expect(eventDetails).not.toBeInTheDocument();
  });
});