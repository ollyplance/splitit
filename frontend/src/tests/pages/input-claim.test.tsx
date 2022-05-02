import React from 'react';
import {render, screen} from '@testing-library/react';
import InputClaimComponent from '../../components/pages/input-claim';

test('it renders input claim component', () => {
  render(<InputClaimComponent />);
  const titleElement = screen.getByText(`Enter Split ID:`);
  expect(titleElement).toBeInTheDocument();
});

