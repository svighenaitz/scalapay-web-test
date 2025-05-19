import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountStep from '@/components/AccountStep';

// Mock dependencies
jest.mock('../store/formSlice', () => ({
  useFormStore: jest.fn(),
}));
jest.mock('../components/useFormFieldChange', () => ({
  useFormFieldChange: jest.fn(),
}));

import { useFormStore } from '../store/formSlice';
import { useFormFieldChange } from '../components/useFormFieldChange';

const mockedUseFormStore = useFormStore as jest.MockedFunction<typeof useFormStore>;
const mockedUseFormFieldChange = useFormFieldChange as jest.MockedFunction<typeof useFormFieldChange>;


describe('AccountStep', () => {
  let updateAccount: jest.Mock, setError: jest.Mock, handleAccountChange: jest.Mock;

  beforeEach(() => {
    updateAccount = jest.fn();
    setError = jest.fn();
    handleAccountChange = jest.fn();
    mockedUseFormStore.mockReturnValue({
      account: {
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        taxCode: '',
      },
      errors: {},
      updateAccount,
      setError,
    });
    mockedUseFormFieldChange.mockReturnValue(handleAccountChange);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all fields and the submit button', () => {
    render(<AccountStep />);
    expect(screen.getByTestId('account-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('account-firstName-input')).toBeInTheDocument();
    expect(screen.getByTestId('account-lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('account-birthDate-input')).toBeInTheDocument();
    expect(screen.getByTestId('account-taxCode-input')).toBeInTheDocument();
    expect(screen.getByTestId('account-continue-button')).toBeInTheDocument();
  });

  it('calls handleAccountChange on input change', () => {
    render(<AccountStep />);
    fireEvent.change(screen.getByTestId('account-email-input'), { target: { value: 'foo@bar.com' } });
    expect(handleAccountChange).toHaveBeenCalled();
    fireEvent.change(screen.getByTestId('account-firstName-input'), { target: { value: 'Mario' } });
    expect(handleAccountChange).toHaveBeenCalled();
    fireEvent.change(screen.getByTestId('account-lastName-input'), { target: { value: 'Rossi' } });
    expect(handleAccountChange).toHaveBeenCalled();
    fireEvent.change(screen.getByTestId('account-taxCode-input'), { target: { value: 'ABCDEF12G34H567I' } });
    expect(handleAccountChange).toHaveBeenCalled();
  });

 
});
