import type { Employee } from '../../src/api/employees'

describe('Employee view', () => {
  it('loads a single employee', () => {
    cy.step('Prepare')
    cy.fixture('employees').then((employees: Employee[]) => {
      cy.intercept('GET', '/api/employees', employees).as(
        'getEmployees',
      )
      cy.intercept('GET', '/api/employees/11', employees[10]).as(
        'getEmployee11',
      )
    })

    cy.visit('/employees')
    cy.wait('@getEmployees')

    cy.step('Go to an employee')
    cy.contains('li.employee', 'Ivy Thomas').find('a').click()
    cy.wait('@getEmployee11')
    cy.location('pathname').should('equal', '/employees/11')
    cy.get('.employee')
      .should('be.visible')
      .find('.name')
      .should('have.text', 'Ivy Thomas')
  })
})
