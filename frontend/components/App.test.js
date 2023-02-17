import React from "react";
import { render, screen } from '@testing-library/react';
import AppFunctional from "./AppFunctional";

// Write your tests here
test('Render without errors', () => {
  render(<AppFunctional />)
});
