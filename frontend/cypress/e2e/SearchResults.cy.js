describe('Search results', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/search/all');
        cy.contains(/rating/i).parent().as('filterBar')
    });
    it('Has some results to filter/sort',()=>{
        cy.get('#searchResults').children().should('have.length.above',0);
    });
    it('Can filter by kitchen', ()=>{
        const filter = 'Kitchen';
        cy.get('@filterBar').contains(filter).click()
        cy.get('#searchResults').find('>*').should(child=>{
            expect(child, 'text content').to.contain.text(filter)
        })
    })
    it('Can filter by multiple things', ()=>{
        const filters = ['Kitchen', 'Wifi'];
        filters.forEach((filter)=>cy.get('@filterBar').contains(filter).click())
        cy.get('#searchResults').find('>*').should(child=>{
            filters.forEach((filter)=>expect(child, 'text content').to.contain.text(filter))
        })
    });
    it('Can filter by range', ()=>{
        cy.contains(/rating/i).as('ratingButon').click().next()
        .find('div[role="slider"]').first().click()
        // now trigger a leftarrow as many times as the filter is needed
    })
})