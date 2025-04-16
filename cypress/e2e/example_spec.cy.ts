describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
  
  it('doesn\'t do much', () => {
    expect(true).to.equal(true);
  })

  it('has type', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type')
  })

  it('visits the website', function () {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    cy.url().should('contain', '/commands/actions')

  })

  // cy.contains() should be used when *text content* of an
  // element is important. cy.get() can be used with, for
  // example, attributes used solely for testing, such as for:
  //
  // <button id="mainButton" name="mainButton" data-test="home button">
  //   Go Home
  // </button>
  //
  // you can find this button with cy.get('[data-test="home button"]')
  //
  // testing attributes shall not be changed after they've originally been set,
  // as to not break tests
})
