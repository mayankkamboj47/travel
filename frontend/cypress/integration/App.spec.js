/* eslint-disable no-undef */
describe('App', () => {
  it('Displays hello world', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').contains('Hello World');
  });
});
