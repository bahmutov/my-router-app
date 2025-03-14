import { createFileRoute } from '@tanstack/react-router'
import type { Employee } from '../api/employees'
import EmployeesAPI from '../api/employees'

export const Route = createFileRoute('/employees')({
  component: EmployeesComponent,
  loader: EmployeesAPI.get,
})

function EmployeesComponent() {
  const employees = Route.useLoaderData()
  console.table(employees)

  return (
    <div className="p-2">
      <h1 className="text-2xl">Employees</h1>
      <ul className="employee-list">
        {employees.map((employee: Employee) => (
          <li key={employee.id} className="employee">
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  )
}
