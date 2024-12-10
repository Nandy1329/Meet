Feature: SpecifyNumberOfEvents

  Scenario: Default number of events is displayed
    Given the user has not specified a number of events
    When the user opens the app
    Then the app should display 32 events by default.

  Scenario: User can change the number of events displayed
     Given the user is viewing the event list
    When the user changes the number of events to display to 10
    Then the event list should display 10 events

  Scenario: User enters an invalid number of events
    Given the main page is open
    When the user enters an invalid number (e.g., zero or negative)
    Then the app should display an error message "Please enter a valid number of events."
    And the app should continue displaying the previously selected number of events.

  Scenario: User clears the input field
    Given the user has specified a number of events
    When the user clears the "number of events" input field
    Then the app should display the default 32 events.