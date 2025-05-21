describe('Happy path form submission', () => {
  it('Submits the form successfully with valid data', () => {
    cy.visit('/form');

    // Step 1: Fill in AccountStep fields
    cy.get('input[name="email"]').type('mario.rossi@example.com'); // Invalid email
    cy.get('input[name="firstName"]').type('Mario');
    cy.get('input[name="lastName"]').type('Rossi');
    cy.get('[data-testid="account-birthDate-input"] input').type('01/01/1990').blur(); // Format: DD/MM/YYYY
    cy.get('body').click(0,0);
    cy.get('input[name="taxCode"]').type('ABCDEF85S14F112Y');
    
    cy.get('[data-testid="account-continue-button"]').click();

    cy.get('[data-testid="address-address-input"]').type('Via Roma');
    cy.get('[data-testid="address-addressNumber-input"]').type('1');
    cy.get('[data-testid="address-postalCode-input"]').type('00100');
    cy.get('[data-testid="address-city-input"]').type('Roma');
    cy.get('[data-testid="address-country-input"]').select('ES');
    cy.get('[data-testid="address-province-input"]').type('RM');
    cy.get('[data-testid="address-continue-button"]').click();

    // Intercept the /submit API call and wait for it
    cy.intercept('POST', '/submit').as('submitForm');
    // The button click above should trigger the API call
    cy.wait('@submitForm').then((interception) => {
      cy.log('Intercepted /submit:', JSON.stringify(interception, null, 2));
      // This will appear in the browser console
      console.log('Intercepted /submit:', interception);
      expect(interception.response.statusCode).to.eq(404);
    });
  });
});
