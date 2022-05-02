import React from 'react';
import {render, screen} from '@testing-library/react';
import NavComponent from '../../components/common/nav';

test('it renders nav component', () => {
  render(<NavComponent />);
  const linkElement = screen.getByText(`Create`);
  expect(linkElement).toBeInTheDocument();
});
