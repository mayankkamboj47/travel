describe('homepage', () => {
  it('exists', () => {
    cy.visit('http://localhost:3000')
  })
  it('contains the site name', () => {
    cy.contains('Aashray')
  })
  it('has the hero which behaves as expected', ()=>{
    cy.contains('Where will you go next')
    cy.contains('Take me anywhere').click()
    cy.url().should('include', '/search/all')
    cy.visit('http://localhost:3000');
  })
  it('contains the about page', ()=>{
    cy.contains('About')
  })
  it('contains the github link', ()=>{
    cy.contains(/[Gg]ithub/)
    // check the url of the link, or that it's an anchor
  })
})