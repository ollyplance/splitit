import React from 'react';
import {render, screen} from '@testing-library/react';
import ClaimComponent from '../../components/pages/claim';

test('it does not render claim component', () => {
  render(<ClaimComponent />);
  const titleElement = screen.getByText('Loading...');
  expect(titleElement).toBeInTheDocument();
});