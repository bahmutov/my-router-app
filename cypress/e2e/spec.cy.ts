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
        let employeeApi: typeof import('../../src/api/employees').default
        Object.defineProperty(win, 'EmployeeAPI', {
          get() {
            // @ts-ignore
            return employeeApi
          },
          set(
            value: typeof import('../../src/api/employees').default,
          ) {
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

  // SKIP: assumes the data is stale immediately
  it.skip('fetches the data while showing the stale list', () => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/employees',
        // we will return a different list
        // on the next request
        times: 1,
      },
      {
        body: employees,
        delay: 1000,
      },
    ).as('getEmployees')
    cy.visit('/employees')
    // confirm the first list is shown
    const names = employees.map((e) => `${e.firstName} ${e.lastName}`)
    cy.get('.employee-list .employee').should('read', names)
    cy.wait('@getEmployees')
    cy.contains('a', 'Home').click()
    cy.contains('Welcome Home!')

    cy.log('**return to the employees page with new data**')
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/employees',
      },
      {
        body: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
          },
        ],
        delay: 1000,
      },
    ).as('getNewEmployees')
    cy.contains('a', 'Employees').click()
    cy.location('pathname').should('equal', '/employees')
    // the old list is shown immediately
    // Note: use shorter timeouts to confirm the
    // caching and request timing
    cy.get('.employee-list .employee', { timeout: 100 }).should(
      'read',
      names,
    )
    // the new list is requested
    cy.wait('@getNewEmployees', { timeout: 1000 })
    cy.get('.employee-list .employee', { timeout: 100 }).should(
      'read',
      ['John Doe'],
    )
  })

  it('fetches the stale data after N milliseconds', () => {
    cy.intercept('GET', '/api/employees', employees).as(
      'getEmployees',
    )
    cy.clock()
    cy.visit('/employees')
    cy.wait('@getEmployees', { timeout: 100 })
    cy.contains('a', 'Home').click()
    cy.contains('Welcome Home!')
    cy.contains('a', 'Employees').click()
    cy.location('pathname').should('equal', '/employees')
    // confirm the data is NOT fetched
    cy.wait(500).get('@getEmployees.all').should('have.length', 1)

    // make the app "think" that 40 seconds have passed
    // and go to the "Employees" tab again
    cy.contains('a', 'Home').click()
    cy.contains('Welcome Home!')
    cy.tick(40_000)
    cy.contains('a', 'Employees').click()
    cy.location('pathname').should('equal', '/employees')
    // the data loader should have requested the employees again
    cy.wait('@getEmployees', { timeout: 100 })
  })
})
