import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
    render(<App />);
});

test('renders title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Smoothie React/i);
    expect(titleElement).toBeInTheDocument();
});
