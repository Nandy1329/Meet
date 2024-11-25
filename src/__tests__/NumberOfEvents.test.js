import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> Component', () => {
    let NumberOfEventsComponent;
    
    // Set up the test environment before each test
    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents
                currentNOE={32}   // Default value set to 32
                setCurrentNOE={() => { }}  // Mock function for setCurrentNOE
                setErrorAlert={() => { }}  // Mock function for setErrorAlert
            />
        );
    });

    // Test 1: Ensure the component contains an input textbox
    test('component contains input textbox', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    // Test 2: Ensure the default value of the textbox is "32" (string, not number)
    test('ensures the default value of textbox is 32', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toHaveValue('32');  // Expecting a string value now
    });

    // Test 3: Ensure the textbox value changes when user updates input
    test('textbox value changes when user updates input', async () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        
        await user.clear(input);  // Clear the input field before typing
        await user.type(input, '10');
   
            expect(input).toHaveValue('10');  // Expecting a string value "10"
        });
    });