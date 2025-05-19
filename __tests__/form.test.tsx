import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Form from '@/pages/form';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


describe('Form page', () => {

  it('updates URL to step=1 if no step query is present', async () => {
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/form',
      replace: replaceMock,
      push: jest.fn(),
    });
    render(<Form />);
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        {
          pathname: '/form',
          query: { step: 1 },
        },
        undefined
      );
    });
  });
});
