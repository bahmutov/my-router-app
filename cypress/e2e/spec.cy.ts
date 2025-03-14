describe('Tanstack router', () => {
  it('loads the list of employees', () => {
    cy.visit('/employees')
    cy.contains('a', 'Employees').should(
      'have.attr',
      'data-status',
      'active',
    )
    cy.get('.employee-list .employee').should('have.length', 11)
  })
})
