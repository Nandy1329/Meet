Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user hasn’t searched for any city
    When the user opens the app
    Then the user should see the list of all upcoming events
    And the event details should be hidden by default

  Scenario: User can expand an event to see its details
    Given the main page is open
    When the user clicks on the “show details” button for an event
    Then the event details should be displayed

  Scenario: User can collapse an event to hide its details
    Given the event details are displayed
    When the user clicks on the “hide details” button for an event
    Then the event details should be hidden