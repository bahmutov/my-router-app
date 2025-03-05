import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees')({
  component: EmployeesComponent,
})

function EmployeesComponent() {
  const employees = [
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
  return (
    <div className="p-2">
      <h1 className="text-2xl">Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  )
}
