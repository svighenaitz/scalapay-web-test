

import { validationMessages } from '../../validation/schemas';

describe('Form validation and error state', () => {
  it('Shows validation error for invalid email format', () => {
    cy.visit('/form');

    // Step 1: Fill in AccountStep fields
    cy.get('input[name="email"]').type('not-an-email'); // Invalid email
    cy.get('input[name="firstName"]').type('Mario');
    cy.get('input[name="lastName"]').type('Rossi');
    cy.get('[data-testid="account-birthDate-input"] input').type('01/01/1990').blur(); // Format: DD/MM/YYYY
    cy.get('body').click(0,0);
    cy.get('input[name="taxCode"]').type('RSSMRA90A01H501U');
    
    cy.get('[data-testid="account-continue-button"]').click();

    // Should see email format error, not errors for other fields
    cy.contains(validationMessages.email.invalid).should('be.visible');

    // Optionally, check aria-invalid for email
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
  });
  it('Shows validation errors when submitting empty form', () => {
    cy.visit('/form'); 
    cy.get('[data-testid="account-continue-button"]').click();
    cy.contains(validationMessages.email.required).should('be.visible'); 
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
  });
});
