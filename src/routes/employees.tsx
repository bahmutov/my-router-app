import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { Employee } from '../api/employees'
import EmployeesAPI from '../api/employees'

export const Route = createFileRoute('/employees')({
  component: EmployeesComponent,
  loader: EmployeesAPI.get,
  // preload the data when the user is likely to visit this component
  // default is true
  preload: true,
  // do not refresh the data if it is less than 30 seconds old
  staleTime: 30_000,
})

function EmployeesComponent() {
  const employees = Route.useLoaderData()

  return (
    <div className="p-2">
      <h1 className="text-2xl">Employees</h1>
      <Outlet />

      <ul className="employee-list">
        {employees.map((employee: Employee) => (
          <li key={employee.id} className="employee">
            <Link
              to={`/employees/$employeeId`}
              params={{ employeeId: String(employee.id) }}
            >
              {employee.firstName} {employee.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
