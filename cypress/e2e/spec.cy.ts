import type { Employee } from '../../src/api/employees'
import 'cypress-map'

describe('Tanstack router', () => {
  const employees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Davis',
    },
    {
      id: 6,
      firstName: 'Diana',
      lastName: 'Miller',
    },
    {
      id: 7,
      firstName: 'Eve',
      lastName: 'Wilson',
    },
    {
      id: 8,
      firstName: 'Frank',
      lastName: 'Moore',
    },
    {
      id: 9,
      firstName: 'Grace',
      lastName: 'Taylor',
    },
    {
      id: 10,
      firstName: 'Hank',
      lastName: 'Anderson',
    },
    {
      id: 11,
      firstName: 'Ivy',
      lastName: 'Thomas',
    },
  ]

  it('fetches the stale data after N milliseconds', () => {
    cy.intercept('GET', '/api/employees', employees).as(
      'getEmployees',
    )
    cy.clock()
    cy.visit('/employees')
    cy.wait('@getEmployees', { timeout: 100 })
    cy.contains('a', 'Home').click()
    cy.location('pathname').should('eq', '/')
    cy.contains('a', 'Employees').click()
    cy.wait(500).get('@getEmployees.all').should('have.length', 1)

    cy.contains('a', 'Home').click()
    cy.location('pathname').should('eq', '/')
    cy.tick(40_000)
    cy.contains('a', 'Employees').click()
    cy.location('pathname').should('eq', '/employees')
    cy.wait('@getEmployees', { timeout: 100 })
  })
})
