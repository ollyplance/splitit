import React from 'react';
import {render, screen} from '@testing-library/react';
import HomeComponent from '../../components/pages/home';

test('it renders home component', () => {
  render(<HomeComponent />);
  const titleElement = screen.getByText(`Split your order today!`);
  expect(titleElement).toBeInTheDocument();
});

