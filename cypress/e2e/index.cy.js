// cypress/e2e/index.cy.js

import { terminalLog } from './terminalLog';

describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page using baseUrl from cypress.config.ts
    cy.visit('/');
    // Inject axe for accessibility testing
    cy.injectAxe();
  });

  // Only fail the test for serious or critical accessibility violations
  it('has no serious or critical a11y violations', () => {
    cy.checkA11y(null, { includedImpacts: ['serious', 'critical'] }, terminalLog);
  });

  // Checks that the main heading is visible
  it('displays the welcome heading', () => {
    cy.contains('h1', 'Welcome to Scalapay Form Test').should('be.visible');
  });

  // Checks that the form start link is present and correct
  it('has a START FILLING FORM link', () => {
    cy.contains('START FILLING FORM')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', '/form');
  });
});

