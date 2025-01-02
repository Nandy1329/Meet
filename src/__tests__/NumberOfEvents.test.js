import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
  let setCurrentNOE;
  let setErrorAlert;

  beforeEach(() => {
    setCurrentNOE = jest.fn();
    setErrorAlert = jest.fn();

    render(
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
    );
  });

  test('component contains an input textbox', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  test('ensures the default value of the textbox is 32', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(32);
  });

  test('textbox value changes when user updates input', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '10');
    expect(input).toHaveValue(10);
  });

  test('shows error when a non-number is entered', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'a');
    expect(setErrorAlert).toHaveBeenCalledWith('Enter a valid number');
  });

  test('shows error when a number greater than 32 is entered', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '50');
    expect(setErrorAlert).toHaveBeenCalledWith('Only a maximum of 32 is allowed');
  });

  test('shows no error and calls setCurrentNOE when a valid number is entered', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '25');
    expect(setErrorAlert).toHaveBeenCalledWith('');
    expect(setCurrentNOE).toHaveBeenCalledWith(25);
  });

  test('resets error when a valid number is entered after an error', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '50');
    expect(setErrorAlert).toHaveBeenCalledWith('Only a maximum of 32 is allowed');

    await user.clear(input);
    await user.type(input, '20');
    expect(setErrorAlert).toHaveBeenCalledWith('');
    expect(setCurrentNOE).toHaveBeenCalledWith(20);
  });

  test('allows input of boundary values (1 and 32)', async () => {
    const input = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '1');
    expect(setErrorAlert).toHaveBeenCalledWith('');
    expect(setCurrentNOE).toHaveBeenCalledWith(1);

    await user.clear(input);
    await user.type(input, '32');
    expect(setErrorAlert).toHaveBeenCalledWith('');
    expect(setCurrentNOE).toHaveBeenCalledWith(32);
  });
});
