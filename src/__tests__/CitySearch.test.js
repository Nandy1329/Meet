import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { getEvents, extractLocations } from "../api";

describe('<CitySearch /> component', () => {
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const mockSetCurrentCity = jest.fn(); // Mock function
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
  
    expect(Array.isArray(allLocations)).toBe(true); // Verify data type
    expect(allLocations.length).toBeGreaterThan(0); // Verify non-empty array
  
    render(
      <CitySearch allLocations={allLocations} setCurrentCity={mockSetCurrentCity} />
    );

    const cityTextBox = screen.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent looks like this: "Berlin, Germany"
    const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const view = render(<App />);

    // Find the CitySearch component within App using a data-testid
    const citySearchComponent = view.container.querySelector('[data-testid="city-search"]');
    expect(citySearchComponent).toBeInTheDocument(); // Ensure CitySearch is rendered

    const cityTextBox = within(citySearchComponent).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    // Now verify if suggestions are displayed
    const suggestionListItems = within(citySearchComponent).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1); // Suggestion list should match the locations
  });
});