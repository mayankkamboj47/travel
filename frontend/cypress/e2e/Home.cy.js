/* eslint-disable no-undef */
describe('App', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000');
  });
  it('Contains the website title', ()=>{
    const title = 'Aashray';
    cy.contains(title);
  });
  it('Hero exists', ()=>{
    cy.contains('div', /Where will you go next/i).contains('a').click()
  });
  it('Visits the generic search on clicking hero button', ()=>{
    cy.contains('Take me anywhere').click();
    cy.url().should('match', /\/search\/all/);
  });
  it('Contains 3 places', ()=>{
    cy.contains('Places').next().children().should('have.length', 3)
  });
  it('On clicking a place, visits search for that page', ()=>{
    cy.contains('Places').next().children().first().click();
    cy.url().should('match', /\/search\/all\?location/);
  });
  it('On search, visits search for that page', ()=>{
    const keyword = 'stay';
    cy.get('nav input').type(`${keyword}{enter}`)
  });
  it('On clicking the profile button, visits profile or login', ()=>{
    cy.get('nav a').last().click();
    cy.url().should('match', /profile|login|signup/);
  });
});
