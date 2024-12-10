Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.
    Given user is on the app
    When the event list is displayed
    Then the event details should be collapsed by default
  Scenario: User can expand an event to see details.
    Given a user is viewing an event in the list
    When the user clicks the Show Details button
    Then the event details should be expanded and displayed
  Scenario: User can collapse an event to hide details.
    Given a user has expanded an event to see details
    When the user clicks the Show Details button
    Then the event details should be collapsed and hidden