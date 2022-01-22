/* eslint-disable no-undef */
describe('App', () => {
  it('Opens airbnb products page', () => {
    cy.visit('https://www.airbnb.co.in/');
    cy.contains('Lonavala Villas');
  });
});
