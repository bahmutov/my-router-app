import type { Employee } from '../../src/api/employees'

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

  it('loads the list of employees', () => {
    cy.intercept('GET', '/api/employees', {
      body: employees,
      delay: 1000,
    }).as('getEmployees')
    cy.visit('/employees')
    cy.wait('@getEmployees')
    cy.contains('a', 'Employees').should(
      'have.attr',
      'data-status',
      'active',
    )
    cy.get('.employee-list .employee').should(
      'have.length',
      employees.length,
    )
  })

  it('uses EmployeeAPI to load the data', () => {
    cy.visit('/employees', {
      onBeforeLoad(win) {
        let employeeApi
        Object.defineProperty(win, 'EmployeeAPI', {
          get() {
            return employeeApi
          },
          set(value) {
            cy.stub(value, 'get').as('get').resolves(employees)
          },
        })
      },
    })

    cy.get('@get').should('have.been.calledOnce')
    cy.contains('a', 'Employees').should(
      'have.attr',
      'data-status',
      'active',
    )
    cy.get('.employee-list .employee').should(
      'have.length',
      employees.length,
    )
  })
})
