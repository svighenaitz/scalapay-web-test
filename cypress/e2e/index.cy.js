// cypress/e2e/index.cy.js

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.injectAxe();
  })

  it('displays the welcome heading', () => {
    cy.contains('h1', 'Welcome to Scalapay Form Test').should('be.visible')
  })

  it('has a START FILLING FORM link', () => {
    cy.contains('START FILLING FORM')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', '/form')
  })
})
