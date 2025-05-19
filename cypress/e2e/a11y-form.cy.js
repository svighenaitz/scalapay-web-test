import { terminalLog } from './terminalLog';

describe('Accessibility check on form page', () => {
  it('Has no detectable a11y violations on load', () => {
    cy.visit('/form'); // Adjust URL if needed
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ['serious', 'critical'] }, terminalLog);
  });
});
